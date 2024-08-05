let employeeId = 1;
let employees = [];

document.getElementById('addEmployeeBtn').addEventListener('click', function() {
    document.getElementById('empDetailDialog').style.display = 'flex';
});

document.getElementById('closeDialogBtn').addEventListener('click', function() {
    document.getElementById('empDetailDialog').style.display = 'none';
});

document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!this.checkValidity()) {
        this.reportValidity();
        return;
    }

    const empId = document.getElementById('empId').value;
    const empName = document.getElementById('empName').value;
    const empEmail = document.getElementById('empEmail').value;
    const empPhone = document.getElementById('empPhone').value;

    if (empId) {
        // Edit existing employee
        const employee = employees.find(emp => emp.id === parseInt(empId));
        employee.name = empName;
        employee.email = empEmail;
        employee.phone = empPhone;
        updateEmployeeTable();
    } else {
        // Add new employee
        const employee = {
            id: employeeId++,
            name: empName,
            email: empEmail,
            phone: empPhone
        };
        employees.push(employee);
        addEmployeeToTable(employee);
    }

    document.getElementById('employeeForm').reset();
    document.getElementById('empDetailDialog').style.display = 'none';
});

function addEmployeeToTable(employee) {
    const tableBody = document.getElementById('employeeTableBody');
    const row = document.createElement('tr');
    row.setAttribute('data-id', employee.id);
    row.innerHTML = `
        <td>${employee.id}</td>
        <td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.phone}</td>
        <td class="actions">
            <i class="fa fa-edit" onclick="editEmployee(${employee.id})"></i>
            <i class="fa fa-trash" onclick="deleteEmployee(${employee.id})"></i>
        </td>
    `;
    tableBody.appendChild(row);
}

function updateEmployeeTable() {
    const tableBody = document.getElementById('employeeTableBody');
    tableBody.innerHTML = '';
    employees.forEach(employee => addEmployeeToTable(employee));
}

function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    document.getElementById('empId').value = employee.id;
    document.getElementById('empName').value = employee.name;
    document.getElementById('empEmail').value = employee.email;
    document.getElementById('empPhone').value = employee.phone;
    document.getElementById('empDetailDialog').style.display = 'flex';
}

function deleteEmployee(id) {
    employees = employees.filter(emp => emp.id !== id);
    updateEmployeeTable();
}

document.getElementById('searchBox').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filteredEmployees = employees.filter(employee => 
        employee.name.toLowerCase().includes(query) || 
        employee.email.toLowerCase().includes(query) || 
        employee.phone.includes(query)
    );
    displayEmployees(filteredEmployees);
});

function displayEmployees(employees) {
    const tableBody = document.getElementById('employeeTableBody');
    tableBody.innerHTML = '';
    employees.forEach(employee => addEmployeeToTable(employee));
}