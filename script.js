createHTMLfromStorage();
    function showAddTaskModal(){
        $("#addTaskModal").modal('show');
    }
    function addTask(){
        console.log('Add Task Clicked');
        $("#addTaskModal").modal('hide');
        var dataArr = $('#taskInputForm').serializeArray();
        var taskObject = new Object();
        var storageObjectArr = [];
        var storageObject = localStorage.getItem('taskStorage');
        for(var i in dataArr){
            var name = dataArr[i]['name'];
            var value = dataArr[i]['value'];
            taskObject[name] = value;
        }
        if(storageObject != null && storageObject != undefined && storageObject != ''){
            storageObjectArr = JSON.parse(storageObject);
            storageObjectArr.push(taskObject)
        }
        else{
            storageObjectArr.push(taskObject);
        }
        console.log(taskObject)
        localStorage.setItem('taskStorage', JSON.stringify(storageObjectArr));
        createHTMLfromStorage();
        $('#taskInputForm').trigger('reset')
    }
    function createHTMLfromStorage(){
        console.log("Hello");
        var storageObjectArr = [];
        var storageObject = localStorage.getItem('taskStorage');
        storageObjectArr = JSON.parse(storageObject);
        var html = '';
        console.log(storageObjectArr)
        if(storageObject != null && storageObject != undefined && storageObject != ''){
            if(storageObjectArr && storageObjectArr.length > 0){
                for(let i in storageObjectArr){
                    var date = new Date(storageObjectArr[i]['taskETA'])
                    html = html + '<tr>'
                                +'<td>' + (parseInt(i)+1) +'</td>'
                                +'<td>' + storageObjectArr[i]['taskDescription'] + '</td>'
                                +'<td>' + storageObjectArr[i]['taskResponsiblePerson'] + '</td>'
                                +'<td>' + date.toUTCString() + '</td>'
                                +'<td><i class="bi bi-check-circle-fill" onclick="markAsDone('+i+')"></i><i class="bi bi-pencil-square" onclick="editTask('+i+')"></i></td></tr>'
                }
            }
            else{
                html = '<tr><td colspan="5">No Tasks Added Yet</td></tr>';
            }
        }
        $('#taskTableBody').html(html);
    }
    function markAsDone(index){
        console.log(index)
        var storageObjectArr = [];
        var storageObject = localStorage.getItem('taskStorage');
        if(storageObject != null && storageObject != undefined && storageObject != ''){
            storageObjectArr = JSON.parse(storageObject);
            storageObjectArr.pop(index);
        }
        localStorage.setItem('taskStorage', JSON.stringify(storageObjectArr))
        createHTMLfromStorage()
    }
    function editTask(index){
        var storageObject = localStorage.getItem('taskStorage');
        var storageObjectArr = [];
        if(storageObject != null && storageObject != undefined && storageObject != ''){
            storageObjectArr = JSON.parse(storageObject);
            $('#editTaskTextArea').val(storageObjectArr[index]['taskDescription'])
            $('#editResponsiblePerson').val(storageObjectArr[index]['taskResponsiblePerson'])
            $('#editETA').val(storageObjectArr[index]['taskETA'])
            $('#editIndex').val(index)
            $('#updateTaskModal').modal('show')  
        }
    }
    function updateTask(){
        $("#updateTaskModal").modal('hide');
        var dataArr = $('#taskUpdateForm').serializeArray();
        var taskObject = new Object();
        var storageObjectArr = [];
        var storageObject = localStorage.getItem('taskStorage');
        for(var i in dataArr){
            var name = dataArr[i]['name'];
            var value = dataArr[i]['value'];
            taskObject[name] = value;
        }
        if(storageObject != null && storageObject != undefined && storageObject != ''){
            storageObjectArr = JSON.parse(storageObject);
            storageObjectArr[taskObject['taskIndex']] = taskObject
        }
        localStorage.setItem('taskStorage', JSON.stringify(storageObjectArr));
        createHTMLfromStorage()
    }