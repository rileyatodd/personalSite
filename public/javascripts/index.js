function onClickOutside(element, f) {
	window.addEventListener('click', function(e) {
		if (!element.contains(e.target)) {
			f()
		}
	})
}

document.addEventListener('DOMContentLoaded', function() {
	document
		.querySelectorAll('.dropdown')
		.forEach(function(container) {
			container.classList.add('engaged')
			container.addEventListener('click', function(el) {
				this.classList.toggle('open')
			})
			onClickOutside(container, function() {
				container.classList.remove('open')
			})
		})
})
