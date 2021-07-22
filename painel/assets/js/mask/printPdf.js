export default function (url) {
    var iframe = document.createElement('iframe');
    iframe.className = 'pdfIframe'
    document.body.appendChild(iframe);
    iframe.style.display = 'none';
    iframe.onload = function () {
        setTimeout(function () {
            iframe.focus();
            iframe.contentWindow.print();
            URL.revokeObjectURL(url)
            // document.body.removeChild(iframe)
        }, 1);
    };
    iframe.src = url;
    // URL.revokeObjectURL(url)
}