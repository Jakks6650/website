document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const adminForm = document.getElementById('adminForm');
    const manageGroups = document.getElementById('manage-groups');
    const manageProjects = document.getElementById('manage-projects');

    if (localStorage.getItem('bgColor')) {
        document.body.style.setProperty('--bg-color', localStorage.getItem('bgColor'));
    }

    if (localStorage.getItem('title')) {
        document.querySelector('header h1').innerText = localStorage.getItem('title');
    }

    const loadGroups = () => {
        const groups = JSON.parse(localStorage.getItem('groups')) || [];
        manageGroups.innerHTML = '';
        groups.forEach((group, index) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p>${group}</p>
                <button onclick="editGroup(${index})">Edit</button>
                <button onclick="deleteGroup(${index})">Delete</button>
            `;
            manageGroups.appendChild(div);
        });
    };

    const loadProjects = () => {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        manageProjects.innerHTML = '';
        projects.forEach((project, index) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p>${project}</p>
                <button onclick="editProject(${index})">Edit</button>
                <button onclick="deleteProject(${index})">Delete</button>
            `;
            manageProjects.appendChild(div);
        });
    };

    window.editGroup = (index) => {
        const newGroup = prompt('Edit group name:', JSON.parse(localStorage.getItem('groups'))[index]);
        if (newGroup) {
            const groups = JSON.parse(localStorage.getItem('groups'));
            groups[index] = newGroup;
            localStorage.setItem('groups', JSON.stringify(groups));
            loadGroups();
        }
    };

    window.deleteGroup = (index) => {
        const groups = JSON.parse(localStorage.getItem('groups'));
        groups.splice(index, 1);
        localStorage.setItem('groups', JSON.stringify(groups));
        loadGroups();
    };

    window.editProject = (index) => {
        const newProject = prompt('Edit project name:', JSON.parse(localStorage.getItem('projects'))[index]);
        if (newProject) {
            const projects = JSON.parse(localStorage.getItem('projects'));
            projects[index] = newProject;
            localStorage.setItem('projects', JSON.stringify(projects));
            loadProjects();
        }
    };

    window.deleteProject = (index) => {
        const projects = JSON.parse(localStorage.getItem('projects'));
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        loadProjects();
    };

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;

            if (username === 'admin' && password === 'password') {
                window.location.href = '../admin/admin.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    if (adminForm) {
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const bgColor = e.target.bgColor.value;
            const title = e.target.title.value;
            const newGroup = e.target.newGroup.value;
            const newProject = e.target.newProject.value;

            if (bgColor) {
                document.body.style.setProperty('--bg-color', bgColor);
                localStorage.setItem('bgColor', bgColor);
            }

            if (title) {
                document.querySelector('header h1').innerText = title;
                localStorage.setItem('title', title);
            }

            if (newGroup) {
                const groups = JSON.parse(localStorage.getItem('groups')) || [];
                groups.push(newGroup);
                localStorage.setItem('groups', JSON.stringify(groups));
                loadGroups();
            }

            if (newProject) {
                const projects = JSON.parse(localStorage.getItem('projects')) || [];
                projects.push(newProject);
                localStorage.setItem('projects', JSON.stringify(projects));
                loadProjects();
            }

            alert('Settings updated');
        });

        loadGroups();
        loadProjects();
    }
});