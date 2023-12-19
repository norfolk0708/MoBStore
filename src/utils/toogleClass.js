export default function toogleClass(e) {
    const icon = e.currentTarget
    icon.classList.value.includes('active') ? icon.classList.remove('active') : icon.classList.add('active')
}