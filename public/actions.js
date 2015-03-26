"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function() {

    function handleDrop(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        
        var files = evt.dataTransfer.files; // FileList object.
        var reader = new FileReader();  
        reader.onload = function(event) {            
            document.getElementById('INPUT').value = event.target.result;
        }        
        reader.readAsText(files[0],"UTF-8");
    }
    
    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    }
    
    // Drag and drop listeners.
    var dropZone = document.getElementById('INPUT');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleDrop, false);
    
    
    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object.
        var reader = new FileReader();  
        reader.onload = function(event) {            
            document.getElementById('INPUT').value = event.target.result;
        }       
        reader.readAsText(files[0],"UTF-8");
    }
     // File select listeners.
     var fileSelect = document.getElementById('select');
     fileSelect.addEventListener('change', handleFileSelect, false);
});