document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const studentsTableBody = document.getElementById('studentsTableBody');
    const refreshBtn = document.getElementById('refreshBtn');
    const showFormBtn = document.getElementById('showFormBtn');
    const studentForm = document.getElementById('studentForm');
    const addStudentForm = document.getElementById('addStudentForm');
    const cancelBtn = document.getElementById('cancelBtn');
    
    // Form inputs
    const studentIdInput = document.getElementById('studentId');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const gradeInput = document.getElementById('grade');
    
    // API URL
    const API_URL = '/api/students';
    
    // Initial load
    loadStudents();
    
    // Event listeners
    refreshBtn.addEventListener('click', loadStudents);
    
    showFormBtn.addEventListener('click', function() {
        resetForm();
        toggleForm(true);
    });
    
    cancelBtn.addEventListener('click', function() {
        toggleForm(false);
        resetForm();
    });
    
    addStudentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveStudent();
    });
    
    // Functions
    function loadStudents() {
        showLoadingMessage();
        
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(students => {
                displayStudents(students);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                showErrorMessage('Failed to load students. Please try again.');
            });
    }
    
    function displayStudents(students) {
        if (students.length === 0) {
            studentsTableBody.innerHTML = '<tr><td colspan="6" class="loading-message">No students found.</td></tr>';
            return;
        }
        
        studentsTableBody.innerHTML = '';
        
        students.forEach(student => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.first_name}</td>
                <td>${student.last_name}</td>
                <td>${student.email}</td>
                <td>${student.grade !== null ? student.grade : '-'}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${student.id}">Edit</button>
                    <button class="action-btn delete-btn" data-id="${student.id}">Delete</button>
                </td>
            `;
            
            studentsTableBody.appendChild(row);
        });
        
        // Add event listeners to the newly created buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                editStudent(id);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                deleteStudent(id);
            });
        });
    }
    
    function showLoadingMessage() {
        studentsTableBody.innerHTML = '<tr><td colspan="6" class="loading-message">Loading students...</td></tr>';
    }
    
    function showErrorMessage(message) {
        studentsTableBody.innerHTML = `<tr><td colspan="6" class="loading-message" style="color: var(--danger-color);">${message}</td></tr>`;
    }
    
    function toggleForm(show) {
        studentForm.style.display = show ? 'block' : 'none';
    }
    
    function resetForm() {
        addStudentForm.reset();
        studentIdInput.value = '';
    }
    
    function saveStudent() {
        const studentId = studentIdInput.value;
        
        const studentData = {
            first_name: firstNameInput.value,
            last_name: lastNameInput.value,
            email: emailInput.value,
            grade: gradeInput.value ? parseFloat(gradeInput.value) : null
        };
        
        const url = studentId ? `${API_URL}/${studentId}` : API_URL;
        const method = studentId ? 'PUT' : 'POST';
        
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.detail || 'Failed to save student');
                });                
            }
            return response.json();
        })
        .then(() => {
            toggleForm(false);
            resetForm();
            loadStudents();
        })
        .catch(error => {
            alert(error.message);
        });
    }
    
    function editStudent(id) {
        fetch(`${API_URL}/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch student data');
                }
                return response.json();
            })
            .then(student => {
                studentIdInput.value = student.id;
                firstNameInput.value = student.first_name;
                lastNameInput.value = student.last_name;
                emailInput.value = student.email;
                gradeInput.value = student.grade !== null ? student.grade : '';
                
                toggleForm(true);
            })
            .catch(error => {
                console.error('Error fetching student:', error);
                alert('Failed to fetch student data. Please try again.');
            });
    }
    
    function deleteStudent(id) {
        if (confirm('Are you sure you want to delete this student?')) {
            fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete student');
                }
                loadStudents();
            })
            .catch(error => {
                console.error('Error deleting student:', error);
                alert('Failed to delete student. Please try again.');
            });
        }
    }
});