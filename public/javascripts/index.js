function onClickOutside(element, f) {
	window.addEventListener('click', function(e) {
		if (!element.contains(e.target)) {
			f(element, e)
		}
	})
}

document.addEventListener('DOMContentLoaded', function() {
	document
		.querySelectorAll('[data-fullscreen-toggle]')
		.forEach(function(toggle) {
			var target = document.getElementById(toggle.dataset.fullscreenTarget)
			target.dataset.fullscreenTargeted = true;
			target.remove()
			document.body.append(target)
			
			toggle.dataset.fullscreenEngaged = true;
			toggle.addEventListener('click', function(el) {
				target.classList.toggle('open')
			})
		})
})
