/* FitTrack demo data and interactions */
const STORAGE_KEY = 'fittrackData';

const DEFAULT_DATA = {
    profile: {
        name: 'Rahul Sharma', age: 22, height: '175 cm', weight: '68 kg',
        gender: 'Male', fitnessLevel: 'Beginner', goal: 'Muscle Gain',
        bio: 'Small steps every day lead to big results.'
    },
    workouts: [
        { id: 1, name: 'Upper Body', date: 'Today', exercises: [
            { name: 'Bench Press', sets: 3, reps: 10, weight: '40 kg' },
            { name: 'Incline Dumbbell Press', sets: 3, reps: 12, weight: '12 kg' },
            { name: 'Tricep Pushdown', sets: 3, reps: 12, weight: '20 kg' },
            { name: 'Dumbbell Fly', sets: 3, reps: 10, weight: '10 kg' },
            { name: 'Shoulder Press', sets: 3, reps: 12, weight: '15 kg' }
        ]}
    ],
    meals: [
        { name: 'Oats + Banana + Almonds', type: 'Breakfast', calories: 450 },
        { name: 'Chicken + Rice + Vegetables', type: 'Lunch', calories: 650 },
        { name: 'Protein Shake + Nuts', type: 'Evening Snack', calories: 250 },
        { name: 'Paneer + Roti + Salad', type: 'Dinner', calories: 550 }
    ],
    water: 2.1
};

function getData() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return saved ? mergeDefaults(saved) : structuredClone(DEFAULT_DATA);
    } catch (_) {
        return structuredClone(DEFAULT_DATA);
    }
}

function mergeDefaults(saved) {
    const base = structuredClone(DEFAULT_DATA);
    return {
        ...base, ...saved,
        profile: { ...base.profile, ...(saved.profile || {}) },
        workouts: Array.isArray(saved.workouts) && saved.workouts.length ? saved.workouts : base.workouts,
        meals: Array.isArray(saved.meals) ? saved.meals : base.meals,
        water: Number.isFinite(saved.water) ? saved.water : base.water
    };
}

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function escapeHTML(value) {
    return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('show');
}
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('show');
}
window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) e.target.classList.remove('show');
});

function updateHeader() {
    const profile = getData().profile;
    document.querySelectorAll('.top-user-name').forEach(el => el.textContent = `Hi, ${profile.name.split(' ')[0]}`);
    document.querySelectorAll('.avatar').forEach(el => el.textContent = profile.name.charAt(0).toUpperCase());
    const greeting = document.querySelector('[data-greeting]');
    if (greeting) greeting.textContent = `Good Morning, ${profile.name}!`;
    document.querySelectorAll('[data-dashboard-weight]').forEach(el => el.textContent = profile.weight);
    document.querySelectorAll('[data-dashboard-goal]').forEach(el => el.textContent = profile.goal);
}

function getCurrentWorkout(data) {
    return data.workouts[data.workouts.length - 1];
}

function renderWorkoutPage() {
    if (document.body.dataset.page !== 'workout') return;
    const data = getData();
    const workout = getCurrentWorkout(data);
    const table = document.getElementById('exerciseTable');
    if (!table || !workout) return;

    const title = document.getElementById('currentWorkoutName');
    if (title) title.textContent = workout.name;

    table.innerHTML = workout.exercises.length ? workout.exercises.map((ex, index) => `
        <tr>
            <td>🏋 ${escapeHTML(ex.name)}</td>
            <td>${escapeHTML(ex.sets)}</td>
            <td>${escapeHTML(ex.reps)}</td>
            <td>${escapeHTML(ex.weight)}</td>
            <td><button class="row-delete" onclick="deleteExercise(${index})" title="Delete exercise">×</button></td>
        </tr>`).join('') : '<tr><td colspan="5" class="empty-state">No exercises yet. Click Add Exercise to start.</td></tr>';

    const count = workout.exercises.length;
    document.getElementById('exerciseCount')?.replaceChildren(document.createTextNode(count));
    document.querySelectorAll('[data-workout-name]').forEach(el => el.textContent = workout.name);
    document.querySelectorAll('[data-workout-count]').forEach(el => el.textContent = count);
    renderWorkoutList(data);
}

function renderWorkoutList(data = getData()) {
    const list = document.getElementById('workoutList');
    if (!list) return;
    list.innerHTML = data.workouts.slice().reverse().map((workout, reverseIndex) => {
        const originalIndex = data.workouts.length - 1 - reverseIndex;
        return `<div class="workout-list-row">
            <div><b>${escapeHTML(workout.name)}</b><small>${escapeHTML(workout.date)} · ${workout.exercises.length} exercises</small></div>
            <button class="outline-small" onclick="selectWorkout(${originalIndex})">Open</button>
        </div>`;
    }).join('');
}

function addWorkout() {
    const input = document.getElementById('workoutName');
    const name = input?.value.trim();
    if (!name) { input?.focus(); return; }

    const data = getData();
    data.workouts.push({ id: Date.now(), name, date: 'Today', exercises: [] });
    saveData(data);
    input.value = '';
    closeModal('workoutModal');
    renderWorkoutPage();
}

function selectWorkout(index) {
    const data = getData();
    if (index < 0 || index >= data.workouts.length) return;
    const selected = data.workouts.splice(index, 1)[0];
    data.workouts.push(selected);
    saveData(data);
    renderWorkoutPage();
}

function addExercise() {
    const nameInput = document.getElementById('exerciseName');
    const name = nameInput?.value.trim();
    if (!name) { nameInput?.focus(); return; }

    const data = getData();
    const workout = getCurrentWorkout(data);
    workout.exercises.push({
        name,
        sets: Number(document.getElementById('exerciseSets')?.value) || 3,
        reps: Number(document.getElementById('exerciseReps')?.value) || 10,
        weight: document.getElementById('exerciseWeight')?.value.trim() || '0 kg'
    });
    saveData(data);
    document.getElementById('exerciseName').value = '';
    document.getElementById('exerciseWeight').value = '';
    closeModal('exerciseModal');
    renderWorkoutPage();
}

function deleteExercise(index) {
    const data = getData();
    const workout = getCurrentWorkout(data);
    workout.exercises.splice(index, 1);
    saveData(data);
    renderWorkoutPage();
}

function addMeal() {
    const nameInput = document.getElementById('mealName');
    const name = nameInput?.value.trim();
    if (!name) { nameInput?.focus(); return; }
    const data = getData();
    data.meals.push({ name, type: 'Custom Meal', calories: Number(document.getElementById('mealCalories')?.value) || 0 });
    saveData(data);
    document.getElementById('mealName').value = '';
    document.getElementById('mealCalories').value = '';
    closeModal('mealModal');
    renderMeals();
}

function renderMeals() {
    const list = document.getElementById('mealList');
    if (!list || document.body.dataset.page !== 'diet') return;
    const data = getData();
    list.innerHTML = data.meals.map(meal => `
        <div class="meal-card"><span class="food-icon large">🍽</span><div><b>${escapeHTML(meal.type)}</b><p>${escapeHTML(meal.name)}</p><small>${escapeHTML(meal.calories)} kcal</small></div><span>›</span></div>`).join('');
}

function logWater() {
    const data = getData();
    data.water = Math.min(3, +(data.water + 0.5).toFixed(1));
    saveData(data);
    renderWater();
}

function renderWater() {
    if (document.body.dataset.page !== 'diet') return;
    const water = getData().water;
    const value = document.getElementById('waterValue');
    const ring = document.getElementById('waterRing');
    if (value) value.textContent = `${water.toFixed(1)} L`;
    if (ring) ring.style.setProperty('--water-progress', `${Math.min(water / 3, 1) * 360}deg`);
}

function toggleEdit() {
    const p = getData().profile;
    document.getElementById('profileName').value = p.name;
    document.getElementById('profileAge').value = p.age;
    document.getElementById('profileHeight').value = p.height;
    document.getElementById('profileWeight').value = p.weight;
    document.getElementById('profileLevel').value = p.fitnessLevel;
    document.getElementById('profileGoal').value = p.goal;
    document.getElementById('profileBio').value = p.bio;
    openModal('editModal');
}

function saveProfile() {
    const data = getData();
    data.profile = {
        ...data.profile,
        name: document.getElementById('profileName').value.trim() || data.profile.name,
        age: Number(document.getElementById('profileAge').value) || data.profile.age,
        height: document.getElementById('profileHeight').value.trim() || data.profile.height,
        weight: document.getElementById('profileWeight').value.trim() || data.profile.weight,
        fitnessLevel: document.getElementById('profileLevel').value,
        goal: document.getElementById('profileGoal').value,
        bio: document.getElementById('profileBio').value.trim() || data.profile.bio
    };
    saveData(data);
    closeModal('editModal');
    renderProfile();
    updateHeader();
}

function renderProfile() {
    if (document.body.dataset.page !== 'profile') return;
    const p = getData().profile;
    document.querySelector('[data-profile-name]')?.replaceChildren(document.createTextNode(p.name));
    document.querySelector('[data-profile-meta]')?.replaceChildren(document.createTextNode(`${p.fitnessLevel} | ${p.gender}`));
    document.querySelector('[data-profile-age]')?.replaceChildren(document.createTextNode(p.age));
    document.querySelector('[data-profile-height]')?.replaceChildren(document.createTextNode(p.height));
    document.querySelector('[data-profile-weight]')?.replaceChildren(document.createTextNode(p.weight));
    document.querySelector('[data-profile-level]')?.replaceChildren(document.createTextNode(p.fitnessLevel));
    document.querySelector('[data-profile-goal]')?.replaceChildren(document.createTextNode(p.goal));
    document.querySelector('[data-profile-bio]')?.replaceChildren(document.createTextNode(`“${p.bio}”`));
    document.querySelector('[data-goal-name]')?.replaceChildren(document.createTextNode(p.goal));
    const goalDescription = document.querySelector('[data-goal-description]');
    if (goalDescription) goalDescription.textContent = p.goal === 'Weight Loss' ? 'Work towards a healthy and sustainable weight.' : 'Build more strength and improve your fitness.';
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
            link.classList.add('active');
        });
    });
    updateHeader();
    renderWorkoutPage();
    renderMeals();
    renderWater();
    renderProfile();
});
