window.onload = async function () {
  fetchQuote();
  getTasks();
};

async function fetchQuote() {
  const res = await fetch('https://zenquotes.io/api/random');
  const data = await res.json();
  document.getElementById('quote').textContent = data[0].q + ' — ' + data[0].a;
}

async function addTask() {
  const taskInput = document.getElementById('taskInput');
  const user = supabase.auth.user();
  if (!user) return alert('Please log in first.');
  const { error } = await supabase.from('tasks').insert([{ content: taskInput.value, user_id: user.id }]);
  if (!error) {
    taskInput.value = '';
    getTasks();
  } else {
    alert('Error adding task.');
  }
}

async function getTasks() {
  const user = supabase.auth.user();
  if (!user) return;
  const { data, error } = await supabase.from('tasks').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  data.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.content;
    li.onclick = () => deleteTask(task.id);
    list.appendChild(li);
  });
}

async function deleteTask(id) {
  await supabase.from('tasks').delete().eq('id', id);
  getTasks();
}

async function signUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) alert(error.message);
  else alert('Check your email to confirm signup.');
}

async function logIn() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const { user, error } = await supabase.auth.signIn({ email, password });
  if (error) alert(error.message);
  else getTasks();
}

function logOut() {
  supabase.auth.signOut();
  document.getElementById('taskList').innerHTML = '';
}


