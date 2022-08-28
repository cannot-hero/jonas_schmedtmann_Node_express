/* eslint-disable */

const login = async (email, password) => {
    // alert({ email, password }) 注意先确认函数可以work
    try {
        const res = await axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/api/v1/users/login',
            data: {
                email,
                password
            }
        })
        if (res.data.status === 'success') {
            alert('Login successfully!')
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)
        }
    } catch (err) {
        alert(err.response.data.message)
    }
}

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email, password)
})
