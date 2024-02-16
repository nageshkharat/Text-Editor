document.getElementById('editor').addEventListener('input', updateWordCount);

function formatText(command, value = null) {
    document.execCommand(command, false, value);
}

function saveFile() {
    const content = document.getElementById('editor').innerHTML;
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'document.txt';
    a.click();
}

function loadFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'text/plain';
    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                document.getElementById('editor').innerHTML = reader.result;
                updateWordCount();
            };
            reader.readAsText(file);
        }
    });
    input.click();
}

function updateWordCount() {
    const content = document.getElementById('editor').innerText;
    const words = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    document.getElementById('wordCount').innerText = `Word Count: ${words}`;
}
