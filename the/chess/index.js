window.onload = function () {
	window.onmessage({
		data: {
			put:
				'<script class="SecureRender">' +
				the.innerText +
				"<" +
				"/script>",
			how: "html",
		},
	});
};
