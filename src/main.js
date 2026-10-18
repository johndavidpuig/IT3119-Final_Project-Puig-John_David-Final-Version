import { supabase } from './supabaseClient.js'
import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <main class="app-shell">
    <section id="loginPanel" class="login-card">
      <div class="brand-mark">SMS</div>
      <p class="eyebrow">ACADEMIC RECORDS</p>
      <h1>Student Management System</h1>
      <p class="muted">Sign in using an account created in Supabase Authentication.</p>

      <form id="loginForm" class="stack-form">
        <label>Email
          <input name="email" type="email" autocomplete="username" required />
        </label>
        <label>Password
          <input name="password" type="password" autocomplete="current-password" required />
        </label>
        <button id="loginBtn" type="submit" class="primary-btn">Sign In</button>
      </form>

      <p id="loginMessage" class="status-message" role="status" aria-live="polite"></p>
    </section>

    <section id="dashboard" hidden>
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark small">SMS</div>
          <div>
            <h1>Student Management</h1>
            <p class="muted">Academic records dashboard</p>
          </div>
        </div>

        <div class="topbar-actions">
          <span id="signedInAs" class="signed-in"></span>
          <button id="refreshBtn" type="button" class="secondary-btn">Refresh</button>
          <button id="logoutBtn" type="button" class="quiet-btn">Sign Out</button>
        </div>
      </header>

      <nav class="tabs" aria-label="Record sections">
        <button type="button" class="tab active" data-view="studentsView">Students</button>
        <button type="button" class="tab" data-view="coursesView">Courses</button>
        <button type="button" class="tab" data-view="departmentsView">Departments</button>
      </nav>

      <p id="globalMessage" class="status-message global-message" role="status" aria-live="polite"></p>

      <section id="studentsView" class="view">
        <div class="section-heading">
          <div>
            <p class="eyebrow">STUDENT DIRECTORY</p>
            <h2>Students</h2>
            <p class="muted">Register, update, search, and remove student records.</p>
          </div>
          <div class="heading-stat">
            <span id="studentCount">0</span>
            <small>students</small>
          </div>
        </div>

        <div class="content-grid">
          <section class="panel form-panel">
            <div class="panel-heading">
              <div>
                <p class="eyebrow">STUDENT DETAILS</p>
                <h3 id="studentFormTitle">Add a student</h3>
              </div>
            </div>

            <form id="studentForm" class="form-grid">
              <label>Student Number
                <input name="student_no" required maxlength="80" />
              </label>

              <label>First Name
                <input name="first_name" required maxlength="100" />
              </label>

              <label>Last Name
                <input name="last_name" required maxlength="100" />
              </label>

              <label>Year Level
                <select name="year_level" required>
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="5">5th Year</option>
                </select>
              </label>

              <label class="full-span">Email
                <input name="email" type="email" required maxlength="255" />
              </label>

              <label class="full-span">Course
                <select name="course_id" id="studentCourseSelect">
                  <option value="">No course assigned</option>
                </select>
              </label>

              <div class="form-actions full-span">
                <button id="studentSubmitBtn" type="submit" class="primary-btn">Add Student</button>
                <button id="studentCancelBtn" type="button" class="secondary-btn" hidden>Cancel</button>
              </div>
            </form>

            <p id="studentFormMessage" class="status-message" role="status" aria-live="polite"></p>
          </section>

          <section class="panel table-panel">
            <div class="table-heading">
              <div>
                <p class="eyebrow">RECORDS</p>
                <h3>Student records</h3>
              </div>
              <input id="studentSearch" class="search-input" type="search" placeholder="Search students..." aria-label="Search students" />
            </div>

            <p id="studentTableMessage" class="table-message">Loading students...</p>

            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student No.</th>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Registered</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="studentsBody"></tbody>
              </table>
            </div>
          </section>
        </div>
      </section>

      <section id="coursesView" class="view" hidden>
        <div class="section-heading">
          <div>
            <p class="eyebrow">ACADEMIC CATALOG</p>
            <h2>Courses</h2>
            <p class="muted">Manage course codes, names, and department assignments.</p>
          </div>
          <div class="heading-stat">
            <span id="courseCount">0</span>
            <small>courses</small>
          </div>
        </div>

        <div class="content-grid">
          <section class="panel form-panel">
            <div class="panel-heading">
              <div>
                <p class="eyebrow">COURSE DETAILS</p>
                <h3 id="courseFormTitle">Add a course</h3>
              </div>
            </div>

            <form id="courseForm" class="form-grid">
              <label>Course Code
                <input name="course_code" required maxlength="40" placeholder="e.g. BSIT" />
              </label>

              <label>Course Name
                <input name="course_name" required maxlength="180" placeholder="e.g. Bachelor of Science in IT" />
              </label>

              <label class="full-span">Department
                <select name="department_id" id="courseDepartmentSelect" required>
                  <option value="">Select department</option>
                </select>
              </label>

              <div class="form-actions full-span">
                <button id="courseSubmitBtn" type="submit" class="primary-btn">Add Course</button>
                <button id="courseCancelBtn" type="button" class="secondary-btn" hidden>Cancel</button>
              </div>
            </form>

            <p id="courseFormMessage" class="status-message" role="status" aria-live="polite"></p>
          </section>

          <section class="panel table-panel">
            <div class="table-heading">
              <div>
                <p class="eyebrow">RECORDS</p>
                <h3>Course list</h3>
              </div>
              <input id="courseSearch" class="search-input" type="search" placeholder="Search courses..." aria-label="Search courses" />
            </div>

            <p id="courseTableMessage" class="table-message">Loading courses...</p>

            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Course Name</th>
                    <th>Department</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="coursesBody"></tbody>
              </table>
            </div>
          </section>
        </div>
      </section>

      <section id="departmentsView" class="view" hidden>
        <div class="section-heading">
          <div>
            <p class="eyebrow">ORGANIZATION</p>
            <h2>Departments</h2>
            <p class="muted">Manage the departments available for course assignments.</p>
          </div>
          <div class="heading-stat">
            <span id="departmentCount">0</span>
            <small>departments</small>
          </div>
        </div>

        <div class="content-grid">
          <section class="panel form-panel">
            <div class="panel-heading">
              <div>
                <p class="eyebrow">DEPARTMENT DETAILS</p>
                <h3 id="departmentFormTitle">Add a department</h3>
              </div>
            </div>

            <form id="departmentForm" class="form-grid">
              <label class="full-span">Department Name
                <input name="department_name" required maxlength="180" placeholder="e.g. College of Information Technology" />
              </label>

              <div class="form-actions full-span">
                <button id="departmentSubmitBtn" type="submit" class="primary-btn">Add Department</button>
                <button id="departmentCancelBtn" type="button" class="secondary-btn" hidden>Cancel</button>
              </div>
            </form>

            <p id="departmentFormMessage" class="status-message" role="status" aria-live="polite"></p>
          </section>

          <section class="panel table-panel">
            <div class="table-heading">
              <div>
                <p class="eyebrow">RECORDS</p>
                <h3>Department list</h3>
              </div>
              <input id="departmentSearch" class="search-input" type="search" placeholder="Search departments..." aria-label="Search departments" />
            </div>

            <p id="departmentTableMessage" class="table-message">Loading departments...</p>

            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Department Name</th>
                    <th>Courses</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="departmentsBody"></tbody>
              </table>
            </div>
          </section>
        </div>
      </section>

      <footer class="footer-note">Student Management System · Supabase database</footer>
    </section>
  </main>
`

// ============================================================
// DOM ELEMENTS
// ============================================================

const $ = selector => document.querySelector(selector)

const loginPanel = $('#loginPanel')
const loginForm = $('#loginForm')
const loginBtn = $('#loginBtn')
const loginMessage = $('#loginMessage')

const dashboard = $('#dashboard')
const signedInAs = $('#signedInAs')
const logoutBtn = $('#logoutBtn')
const refreshBtn = $('#refreshBtn')
const globalMessage = $('#globalMessage')

const studentForm = $('#studentForm')
const studentSubmitBtn = $('#studentSubmitBtn')
const studentCancelBtn = $('#studentCancelBtn')
const studentFormTitle = $('#studentFormTitle')
const studentFormMessage = $('#studentFormMessage')
const studentTableMessage = $('#studentTableMessage')
const studentsBody = $('#studentsBody')
const studentSearch = $('#studentSearch')
const studentCourseSelect = $('#studentCourseSelect')

const courseForm = $('#courseForm')
const courseSubmitBtn = $('#courseSubmitBtn')
const courseCancelBtn = $('#courseCancelBtn')
const courseFormTitle = $('#courseFormTitle')
const courseFormMessage = $('#courseFormMessage')
const courseTableMessage = $('#courseTableMessage')
const coursesBody = $('#coursesBody')
const courseSearch = $('#courseSearch')
const courseDepartmentSelect = $('#courseDepartmentSelect')

const departmentForm = $('#departmentForm')
const departmentSubmitBtn = $('#departmentSubmitBtn')
const departmentCancelBtn = $('#departmentCancelBtn')
const departmentFormTitle = $('#departmentFormTitle')
const departmentFormMessage = $('#departmentFormMessage')
const departmentTableMessage = $('#departmentTableMessage')
const departmentsBody = $('#departmentsBody')
const departmentSearch = $('#departmentSearch')

// ============================================================
// APPLICATION STATE
// ============================================================

let currentUser = null

let students = []
let courses = []
let departments = []

let editingStudentId = null
let editingCourseId = null
let editingDepartmentId = null

// ============================================================
// SHARED UI HELPERS
// ============================================================

function setMessage(element, message = '', isError = false) {
  element.textContent = message
  element.className = `status-message${
    message ? (isError ? ' error' : ' success') : ''
  }`
}

function setTableMessage(element, message, isError = false) {
  element.textContent = message
  element.hidden = !message
  element.classList.toggle('error-text', isError)
}

function addCell(row, value) {
  const cell = document.createElement('td')
  cell.textContent = String(value ?? '—')
  row.appendChild(cell)
  return cell
}

function makeActionButton(label, className, handler) {
  const button = document.createElement('button')

  button.type = 'button'
  button.textContent = label
  button.className = `action-btn ${className}`

  button.addEventListener('click', handler)

  return button
}

function makeActionsCell(row, buttons) {
  const cell = document.createElement('td')

  cell.className = 'actions-cell'

  buttons.forEach(button => cell.appendChild(button))

  row.appendChild(cell)
}

function setBusy(button, busy, busyText) {
  if (busy) {
    if (!button.disabled) {
      button.dataset.originalText = button.textContent
    }

    button.textContent = busyText
    button.disabled = true
  } else {
    button.textContent = button.dataset.originalText || button.textContent
    button.disabled = false
    delete button.dataset.originalText
  }
}

// ============================================================
// AUTHENTICATION AND NAVIGATION
// ============================================================

function showLogin() {
  currentUser = null

  students = []
  courses = []
  departments = []

  studentsBody.replaceChildren()
  coursesBody.replaceChildren()
  departmentsBody.replaceChildren()

  $('#studentCount').textContent = '0'
  $('#courseCount').textContent = '0'
  $('#departmentCount').textContent = '0'

  dashboard.hidden = true
  loginPanel.hidden = false

  loginForm.reset()

  setMessage(loginMessage, '')
  setMessage(globalMessage, '')

  setTableMessage(studentTableMessage, 'Sign in to load student records.')
  setTableMessage(courseTableMessage, 'Sign in to load course records.')
  setTableMessage(departmentTableMessage, 'Sign in to load department records.')

  resetStudentForm()
  resetCourseForm()
  resetDepartmentForm()
}

function showDashboard(user) {
  currentUser = user

  loginPanel.hidden = true
  dashboard.hidden = false

  signedInAs.textContent = user.email || 'Signed in'

  loadAllData()
}

function switchView(viewId) {
  document.querySelectorAll('.view').forEach(view => {
    view.hidden = view.id !== viewId
  })

  document.querySelectorAll('.tab').forEach(tab => {
    const active = tab.dataset.view === viewId

    tab.classList.toggle('active', active)
    tab.setAttribute('aria-current', active ? 'page' : 'false')
  })

  setMessage(globalMessage, '')
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    switchView(tab.dataset.view)
  })
})

// ============================================================
// SIGN IN
// ============================================================

loginForm.addEventListener('submit', async event => {
  event.preventDefault()

  setBusy(loginBtn, true, 'Signing in…')
  setMessage(loginMessage, 'Signing in…')

  const data = new FormData(loginForm)

  try {
    const { data: result, error } =
      await supabase.auth.signInWithPassword({
        email: String(data.get('email')).trim(),
        password: String(data.get('password'))
      })

    if (error) throw error

    showDashboard(result.user)
  } catch (error) {
    console.error('Sign-in failed:', error)

    setMessage(
      loginMessage,
      'Sign-in failed. Check your email and password, then try again.',
      true
    )
  } finally {
    setBusy(loginBtn, false)
  }
})

// ============================================================
// SIGN OUT
// ============================================================

logoutBtn.addEventListener('click', async () => {
  setBusy(logoutBtn, true, 'Signing out…')

  try {
    const { error } = await supabase.auth.signOut()

    if (error) throw error

    showLogin()
  } catch (error) {
    console.error('Sign-out failed:', error)

    setMessage(
      globalMessage,
      `Sign-out failed: ${error.message}`,
      true
    )
  } finally {
    setBusy(logoutBtn, false)
  }
})

// ============================================================
// REFRESH ALL DATA
// ============================================================

refreshBtn.addEventListener('click', loadAllData)

async function loadAllData() {
  if (!currentUser) return

  setBusy(refreshBtn, true, 'Refreshing…')

  setTableMessage(studentTableMessage, 'Loading students…')
  setTableMessage(courseTableMessage, 'Loading courses…')
  setTableMessage(departmentTableMessage, 'Loading departments…')

  try {
    console.log('[Refresh] Started loading')

    // Check the current Supabase session.
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession()

    console.log('[Refresh] Session check finished', {
      hasSession: Boolean(sessionData?.session),
      error: sessionError?.message
    })

    if (sessionError) throw sessionError

    if (!sessionData?.session) {
      showLogin()
      return
    }

    // Load all three tables concurrently.
    console.log('[Refresh] Starting table queries')

    const [studentResult, courseResult, departmentResult] =
      await Promise.all([
        supabase
          .from('students')
          .select('*')
          .order('student_id', { ascending: true }),

        supabase
          .from('courses')
          .select('*')
          .order('course_id', { ascending: true }),

        supabase
          .from('departments')
          .select('*')
          .order('department_id', { ascending: true })
      ])

    console.log('[Refresh] All table queries finished', {
      students: studentResult.data?.length,
      courses: courseResult.data?.length,
      departments: departmentResult.data?.length
    })

    // Check errors returned by Supabase.
    if (studentResult.error) {
      throw new Error(`Students: ${studentResult.error.message}`)
    }

    if (courseResult.error) {
      throw new Error(`Courses: ${courseResult.error.message}`)
    }

    if (departmentResult.error) {
      throw new Error(`Departments: ${departmentResult.error.message}`)
    }

    // Store the records.
    students = studentResult.data || []
    courses = courseResult.data || []
    departments = departmentResult.data || []

    // Render the tables and update dropdowns.
    renderStudents()
    renderCourses()
    renderDepartments()
    refreshSelects()

    setMessage(globalMessage, 'Records refreshed.')

    console.log('[Refresh] Completed successfully')
  } catch (error) {
    console.error('Error loading records:', error)

    setMessage(
      globalMessage,
      `Unable to load records. ${error.message || 'Unknown error.'}`,
      true
    )

    setTableMessage(
      studentTableMessage,
      'Could not load student records. Check the error details.',
      true
    )

    setTableMessage(
      courseTableMessage,
      'Could not load course records. Check the error details.',
      true
    )

    setTableMessage(
      departmentTableMessage,
      'Could not load department records. Check the error details.',
      true
    )
  } finally {
    setBusy(refreshBtn, false)
    console.log('[Refresh] Finished')
  }
}

// ============================================================
// STUDENTS: RENDER
// ============================================================

function renderStudents() {
  const query = studentSearch.value.trim().toLowerCase()

  const filtered = students.filter(student => {
    const course = courses.find(
      item => Number(item.course_id) === Number(student.course_id)
    )

    return [
      student.student_id,
      student.student_no,
      student.first_name,
      student.last_name,
      student.email,
      student.year_level,
      course?.course_code,
      course?.course_name
    ].some(value =>
      String(value ?? '').toLowerCase().includes(query)
    )
  })

  $('#studentCount').textContent = String(filtered.length)

  studentsBody.replaceChildren()

  if (!filtered.length) {
    setTableMessage(
      studentTableMessage,
      query
        ? 'No students match your search.'
        : 'No student records found.'
    )
    return
  }

  setTableMessage(studentTableMessage, '')

  for (const student of filtered) {
    const row = document.createElement('tr')

    addCell(row, student.student_id)
    addCell(row, student.student_no)

    addCell(
      row,
      `${student.first_name} ${student.last_name}`
    )

    const year = Number(student.year_level)

    const suffix =
      year === 1 ? 'st' :
      year === 2 ? 'nd' :
      year === 3 ? 'rd' : 'th'

    addCell(row, `${year}${suffix} Year`)
    addCell(row, student.email)

    const course = courses.find(
      item => Number(item.course_id) === Number(student.course_id)
    )

    addCell(
      row,
      course
        ? `${course.course_code} — ${course.course_name}`
        : 'Unassigned'
    )

    addCell(
      row,
      student.created_at
        ? new Date(student.created_at).toLocaleDateString()
        : '—'
    )

    makeActionsCell(row, [
      makeActionButton(
        'Edit',
        'edit-action',
        () => beginStudentEdit(student)
      ),
      makeActionButton(
        'Delete',
        'delete-action',
        () => deleteStudent(student.student_id)
      )
    ])

    studentsBody.appendChild(row)
  }
}

// ============================================================
// STUDENTS: ADD AND EDIT
// ============================================================

function beginStudentEdit(student) {
  editingStudentId = student.student_id

  studentForm.elements.student_no.value = student.student_no || ''
  studentForm.elements.first_name.value = student.first_name || ''
  studentForm.elements.last_name.value = student.last_name || ''
  studentForm.elements.year_level.value = String(student.year_level ?? '')
  studentForm.elements.email.value = student.email || ''

  studentForm.elements.course_id.value =
    student.course_id == null ? '' : String(student.course_id)

  studentFormTitle.textContent = 'Update student'
  studentSubmitBtn.textContent = 'Save Changes'
  studentCancelBtn.hidden = false

  setMessage(
    studentFormMessage,
    `Editing ${student.first_name} ${student.last_name}.`
  )

  studentForm.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

function resetStudentForm() {
  editingStudentId = null

  studentForm.reset()

  studentFormTitle.textContent = 'Add a student'
  studentSubmitBtn.textContent = 'Add Student'
  studentCancelBtn.hidden = true

  setMessage(studentFormMessage, '')
}

studentCancelBtn.addEventListener('click', resetStudentForm)

studentForm.addEventListener('submit', async event => {
  event.preventDefault()

  setBusy(
    studentSubmitBtn,
    true,
    editingStudentId === null ? 'Adding…' : 'Saving…'
  )

  const data = new FormData(studentForm)
  const courseValue = String(data.get('course_id') || '').trim()

  const student = {
    student_no: String(data.get('student_no')).trim(),
    first_name: String(data.get('first_name')).trim(),
    last_name: String(data.get('last_name')).trim(),
    year_level: Number(data.get('year_level')),
    email: String(data.get('email')).trim(),
    course_id: courseValue ? Number(courseValue) : null
  }

  if (
    !student.student_no ||
    !student.first_name ||
    !student.last_name ||
    !student.email ||
    !Number.isInteger(student.year_level) ||
    student.year_level < 1 ||
    student.year_level > 5 ||
    (
      courseValue &&
      (
        !Number.isInteger(student.course_id) ||
        student.course_id < 1
      )
    )
  ) {
    setMessage(
      studentFormMessage,
      'Please enter valid student information.',
      true
    )

    setBusy(studentSubmitBtn, false)
    return
  }

  try {
    let result

    if (editingStudentId !== null) {
      result = await supabase
        .from('students')
        .update(student)
        .eq('student_id', editingStudentId)
        .select('student_id')
    } else {
      result = await supabase
        .from('students')
        .insert([student])
        .select('student_id')
    }

    if (result.error) throw result.error

    if (!result.data?.length) {
      throw new Error(
        'No record changed. Check your Supabase permissions.'
      )
    }

    const wasEditing = editingStudentId !== null

    resetStudentForm()

    setMessage(
      studentFormMessage,
      wasEditing
        ? 'Student updated successfully.'
        : 'Student added successfully.'
    )

    await loadAllData()
  } catch (error) {
    console.error('Saving student failed:', error)

    if (error.code === '23505') {
      setMessage(
        studentFormMessage,
        'That student number or email is already registered.',
        true
      )
    } else if (error.code === '23503') {
      setMessage(
        studentFormMessage,
        'The selected course does not exist.',
        true
      )
    } else {
      setMessage(
        studentFormMessage,
        `Could not save student: ${error.message}`,
        true
      )
    }
  } finally {
    setBusy(studentSubmitBtn, false)
  }
})

// ============================================================
// STUDENTS: DELETE
// ============================================================

async function deleteStudent(id) {
  const student = students.find(
    item => Number(item.student_id) === Number(id)
  )

  if (
    !student ||
    !confirm(
      `Delete student ${student.first_name} ${student.last_name}? This cannot be undone.`
    )
  ) {
    return
  }

  try {
    const { data, error } = await supabase
      .from('students')
      .delete()
      .eq('student_id', id)
      .select('student_id')

    if (error) throw error

    if (!data?.length) {
      throw new Error(
        'No record was deleted. Check your permissions.'
      )
    }

    if (Number(editingStudentId) === Number(id)) {
      resetStudentForm()
    }

    setMessage(globalMessage, 'Student deleted.')

    await loadAllData()
  } catch (error) {
    console.error('Delete student failed:', error)

    setMessage(
      globalMessage,
      `Could not delete student: ${error.message}`,
      true
    )
  }
}

// ============================================================
// COURSES: RENDER
// ============================================================

function renderCourses() {
  const query = courseSearch.value.trim().toLowerCase()

  const filtered = courses.filter(course => {
    const department = departments.find(
      item => Number(item.department_id) === Number(course.department_id)
    )

    return [
      course.course_id,
      course.course_code,
      course.course_name,
      course.department_name,
      department?.department_name
    ].some(value =>
      String(value ?? '').toLowerCase().includes(query)
    )
  })

  $('#courseCount').textContent = String(filtered.length)

  coursesBody.replaceChildren()

  if (!filtered.length) {
    setTableMessage(
      courseTableMessage,
      query
        ? 'No courses match your search.'
        : 'No course records found.'
    )
    return
  }

  setTableMessage(courseTableMessage, '')

  for (const course of filtered) {
    const row = document.createElement('tr')

    addCell(row, course.course_id)
    addCell(row, course.course_code)
    addCell(row, course.course_name)

    const department = departments.find(
      item => Number(item.department_id) === Number(course.department_id)
    )

    addCell(
      row,
      department?.department_name ||
      course.department_name ||
      'Unassigned'
    )

    makeActionsCell(row, [
      makeActionButton(
        'Edit',
        'edit-action',
        () => beginCourseEdit(course)
      ),
      makeActionButton(
        'Delete',
        'delete-action',
        () => deleteCourse(course.course_id)
      )
    ])

    coursesBody.appendChild(row)
  }
}

// ============================================================
// COURSES: ADD AND EDIT
// ============================================================

function beginCourseEdit(course) {
  editingCourseId = course.course_id

  courseForm.elements.course_code.value = course.course_code || ''
  courseForm.elements.course_name.value = course.course_name || ''

  courseForm.elements.department_id.value =
    course.department_id == null ? '' : String(course.department_id)

  courseFormTitle.textContent = 'Update course'
  courseSubmitBtn.textContent = 'Save Changes'
  courseCancelBtn.hidden = false

  setMessage(
    courseFormMessage,
    `Editing ${course.course_code}.`
  )

  courseForm.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

function resetCourseForm() {
  editingCourseId = null

  courseForm.reset()

  courseFormTitle.textContent = 'Add a course'
  courseSubmitBtn.textContent = 'Add Course'
  courseCancelBtn.hidden = true

  setMessage(courseFormMessage, '')
}

courseCancelBtn.addEventListener('click', resetCourseForm)

courseForm.addEventListener('submit', async event => {
  event.preventDefault()

  setBusy(
    courseSubmitBtn,
    true,
    editingCourseId === null ? 'Adding…' : 'Saving…'
  )

  const data = new FormData(courseForm)
  const departmentId = Number(data.get('department_id'))

  const department = departments.find(
    item => Number(item.department_id) === departmentId
  )

  if (!department) {
    setMessage(
      courseFormMessage,
      'Select a valid department first. Add a department if the list is empty.',
      true
    )

    setBusy(courseSubmitBtn, false)
    return
  }

  const course = {
    course_code: String(data.get('course_code')).trim(),
    course_name: String(data.get('course_name')).trim(),
    department_id: departmentId,
    department_name: String(department.department_name || '').trim()
  }

  if (
    !course.course_code ||
    !course.course_name ||
    !course.department_name
  ) {
    setMessage(
      courseFormMessage,
      'Enter a course code, course name, and department name.',
      true
    )

    setBusy(courseSubmitBtn, false)
    return
  }

  try {
    let result

    if (editingCourseId !== null) {
      result = await supabase
        .from('courses')
        .update(course)
        .eq('course_id', editingCourseId)
        .select('course_id')
    } else {
      result = await supabase
        .from('courses')
        .insert([course])
        .select('course_id')
    }

    if (result.error) throw result.error

    if (!result.data?.length) {
      throw new Error(
        'No record changed. Check your Supabase permissions.'
      )
    }

    const wasEditing = editingCourseId !== null

    resetCourseForm()

    setMessage(
      courseFormMessage,
      wasEditing
        ? 'Course updated successfully.'
        : 'Course added successfully.'
    )

    await loadAllData()
  } catch (error) {
    console.error('Saving course failed:', error)

    if (error.code === '23505') {
      setMessage(
        courseFormMessage,
        'That course code is already in use.',
        true
      )
    } else if (error.code === '23503') {
      setMessage(
        courseFormMessage,
        'That department is referenced incorrectly or no longer exists.',
        true
      )
    } else {
      setMessage(
        courseFormMessage,
        `Could not save course: ${error.message}`,
        true
      )
    }
  } finally {
    setBusy(courseSubmitBtn, false)
  }
})

// ============================================================
// COURSES: DELETE
// ============================================================

async function deleteCourse(id) {
  const course = courses.find(
    item => Number(item.course_id) === Number(id)
  )

  if (
    !course ||
    !confirm(
      `Delete course ${course.course_code} — ${course.course_name}? Students assigned to this course may prevent deletion.`
    )
  ) {
    return
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .delete()
      .eq('course_id', id)
      .select('course_id')

    if (error) throw error

    if (!data?.length) {
      throw new Error(
        'No record was deleted. Check your permissions.'
      )
    }

    if (Number(editingCourseId) === Number(id)) {
      resetCourseForm()
    }

    setMessage(globalMessage, 'Course deleted.')

    await loadAllData()
  } catch (error) {
    console.error('Delete course failed:', error)

    if (error.code === '23503') {
      setMessage(
        globalMessage,
        'Cannot delete this course because student records reference it. Reassign those students or clear their course first.',
        true
      )
    } else {
      setMessage(
        globalMessage,
        `Could not delete course: ${error.message}`,
        true
      )
    }
  }
}

// ============================================================
// DEPARTMENTS: RENDER
// ============================================================

function renderDepartments() {
  const query = departmentSearch.value.trim().toLowerCase()

  const filtered = departments.filter(department => {
    const linkedCourses = courses.filter(
      course =>
        Number(course.department_id) === Number(department.department_id)
    )

    return [
      department.department_id,
      department.department_name,
      linkedCourses.length
    ].some(value =>
      String(value ?? '').toLowerCase().includes(query)
    )
  })

  $('#departmentCount').textContent = String(filtered.length)

  departmentsBody.replaceChildren()

  if (!filtered.length) {
    setTableMessage(
      departmentTableMessage,
      query
        ? 'No departments match your search.'
        : 'No department records found.'
    )
    return
  }

  setTableMessage(departmentTableMessage, '')

  for (const department of filtered) {
    const row = document.createElement('tr')

    addCell(row, department.department_id)

    addCell(
      row,
      department.department_name || '(Unnamed department)'
    )

    const linkedCourses = courses.filter(
      course =>
        Number(course.department_id) === Number(department.department_id)
    )

    addCell(row, linkedCourses.length)

    makeActionsCell(row, [
      makeActionButton(
        'Edit',
        'edit-action',
        () => beginDepartmentEdit(department)
      ),
      makeActionButton(
        'Delete',
        'delete-action',
        () => deleteDepartment(department.department_id)
      )
    ])

    departmentsBody.appendChild(row)
  }
}

// ============================================================
// DEPARTMENTS: ADD AND EDIT
// ============================================================

function beginDepartmentEdit(department) {
  editingDepartmentId = department.department_id

  departmentForm.elements.department_name.value =
    department.department_name || ''

  departmentFormTitle.textContent = 'Update department'
  departmentSubmitBtn.textContent = 'Save Changes'
  departmentCancelBtn.hidden = false

  setMessage(
    departmentFormMessage,
    `Editing department #${department.department_id}.`
  )

  departmentForm.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

function resetDepartmentForm() {
  editingDepartmentId = null

  departmentForm.reset()

  departmentFormTitle.textContent = 'Add a department'
  departmentSubmitBtn.textContent = 'Add Department'
  departmentCancelBtn.hidden = true

  setMessage(departmentFormMessage, '')
}

departmentCancelBtn.addEventListener(
  'click',
  resetDepartmentForm
)

departmentForm.addEventListener('submit', async event => {
  event.preventDefault()

  setBusy(
    departmentSubmitBtn,
    true,
    editingDepartmentId === null ? 'Adding…' : 'Saving…'
  )

  const departmentName = String(
    new FormData(departmentForm).get('department_name')
  ).trim()

  if (!departmentName) {
    setMessage(
      departmentFormMessage,
      'Department name is required.',
      true
    )

    setBusy(departmentSubmitBtn, false)
    return
  }

  try {
    let result

    if (editingDepartmentId !== null) {
      result = await supabase
        .from('departments')
        .update({ department_name: departmentName })
        .eq('department_id', editingDepartmentId)
        .select('department_id')
    } else {
      result = await supabase
        .from('departments')
        .insert([{ department_name: departmentName }])
        .select('department_id')
    }

    if (result.error) throw result.error

    if (!result.data?.length) {
      throw new Error(
        'No record changed. Check your Supabase permissions.'
      )
    }

    const wasEditing = editingDepartmentId !== null

    resetDepartmentForm()

    setMessage(
      departmentFormMessage,
      wasEditing
        ? 'Department updated successfully.'
        : 'Department added successfully.'
    )

    await loadAllData()
  } catch (error) {
    console.error('Saving department failed:', error)

    setMessage(
      departmentFormMessage,
      `Could not save department: ${error.message}`,
      true
    )
  } finally {
    setBusy(departmentSubmitBtn, false)
  }
})

// ============================================================
// DEPARTMENTS: DELETE
// ============================================================

async function deleteDepartment(id) {
  const department = departments.find(
    item => Number(item.department_id) === Number(id)
  )

  if (
    !department ||
    !confirm(
      `Delete department "${department.department_name || 'Unnamed department'}"? This may be blocked if courses use it.`
    )
  ) {
    return
  }

  try {
    const { data, error } = await supabase
      .from('departments')
      .delete()
      .eq('department_id', id)
      .select('department_id')

    if (error) throw error

    if (!data?.length) {
      throw new Error(
        'No record was deleted. Check your permissions.'
      )
    }

    if (Number(editingDepartmentId) === Number(id)) {
      resetDepartmentForm()
    }

    setMessage(globalMessage, 'Department deleted.')

    await loadAllData()
  } catch (error) {
    console.error('Delete department failed:', error)

    if (error.code === '23503') {
      setMessage(
        globalMessage,
        'Cannot delete this department because one or more courses reference it. Reassign or remove those courses first.',
        true
      )
    } else {
      setMessage(
        globalMessage,
        `Could not delete department: ${error.message}`,
        true
      )
    }
  }
}

// ============================================================
// REFRESH FORM DROPDOWNS
// ============================================================

function refreshSelects() {
  const studentCurrent = studentCourseSelect.value

  studentCourseSelect.replaceChildren(
    new Option('No course assigned', '')
  )

  for (const course of courses) {
    studentCourseSelect.add(
      new Option(
        `${course.course_code} — ${course.course_name}`,
        String(course.course_id)
      )
    )
  }

  if (
    [...studentCourseSelect.options].some(
      option => option.value === studentCurrent
    )
  ) {
    studentCourseSelect.value = studentCurrent
  }

  const currentDepartment = courseDepartmentSelect.value

  courseDepartmentSelect.replaceChildren(
    new Option('Select department', '')
  )

  for (const department of departments) {
    if (department.department_name?.trim()) {
      courseDepartmentSelect.add(
        new Option(
          department.department_name,
          String(department.department_id)
        )
      )
    }
  }

  if (
    [...courseDepartmentSelect.options].some(
      option => option.value === currentDepartment
    )
  ) {
    courseDepartmentSelect.value = currentDepartment
  }
}

// ============================================================
// SEARCH EVENTS
// ============================================================

studentSearch.addEventListener('input', renderStudents)
courseSearch.addEventListener('input', renderCourses)
departmentSearch.addEventListener('input', renderDepartments)

// ============================================================
// INITIALIZE APPLICATION
// ============================================================

async function initializeApp() {
  try {
    const { data, error } = await supabase.auth.getSession()

    if (error) throw error

    if (data.session?.user) {
      showDashboard(data.session.user)
    } else {
      showLogin()
    }
  } catch (error) {
    console.error('Authentication initialization failed:', error)

    showLogin()

    setMessage(
      loginMessage,
      'Unable to check your session. Refresh the page and try again.',
      true
    )
  }
}

// Respond to sign-in and sign-out changes.
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    showLogin()
  } else if (
    event === 'SIGNED_IN' &&
    session?.user &&
    currentUser?.id !== session.user.id
  ) {
    showDashboard(session.user)
  }
})

initializeApp()