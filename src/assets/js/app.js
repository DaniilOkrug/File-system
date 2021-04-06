const wrapper = document.getElementById('wrapper')
const sidebar = document.getElementById('sidebar')

wrapper.addEventListener("click" , () => {
    wrapper.classList.add('active')
    sidebar.classList.remove('active')
})

sidebar.addEventListener("click" , () => {
    sidebar.classList.add('active')
    wrapper.classList.remove('active')
})