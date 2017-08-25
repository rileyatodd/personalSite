function onClickOutside(element, f) {
	window.addEventListener('click', function(e) {
		if (!element.contains(e.target)) {
			f(element, e)
		}
	})
}

document.addEventListener('DOMContentLoaded', function() {
	document.addEventListener('click', function(e) {
		var toggleClass = e.target.dataset.toggleClass
		var selector = e.target.dataset.target

		toggleClass && selector 
		&& document.querySelectorAll(selector).forEach(function(target) {
			target.classList.toggle(toggleClass)
		})
	})

	document
		.querySelectorAll('[data-move-to]')
		.forEach(function(el) {
			el.remove()
			document.querySelector(el.dataset.moveTo).append(el)
		})
})
