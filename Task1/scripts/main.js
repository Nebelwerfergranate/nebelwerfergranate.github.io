$().ready(function() {
    var modalWindow = new ModalWindow();

    var data = [];
    var sorter = null;

    var sortingIsRunning = false; // для работы обработчика нажатия клавиши enter.

    // для работы автоматической сортировки.
    var intervalId = null;
    var autosortIsRunning = false;

    $("#inputField").select();

    $("#addNumberBtn").click(onAddBtnClick);
    $("#startBtn").click(onStartBtnClick);
    $("#randomBtn").click(onRandBtnClick);
    $("#nextStepBtn").click(onStepBtnClick);
    $("#resetBtn").click(onResetBtnClick);
    $("#autoSortBtn").click(onAutoBtnClick);
    $(document).keydown(onKeyDown);

    function render(data, numbersSorted) {
        var numbersSorted = numbersSorted || 0;
        $("#screen").html("");
        for (var i = 0; i < data.length; i++) {
            $("#screen").append("<p>" + data[i] + "</p>");
            if (data.length - i <= numbersSorted) {
                $("#screen p").eq(i).addClass("sorted");
            }
        }
    }

    function onAddBtnClick() {
        var validator = new InputValidator();
        var input = document.getElementById("inputField");
        var msg = $("#mod_text");

        var result = validator.validateNumber(input);
        if (result.hasError) {
            modalWindow.showErrorMessage(result.message);
            return;
        }

        data.push(parseInt(input.value));
        input.value = 0;
        input.select();
        render(data);
    }

    function onStartBtnClick() {
        if (data.length < 2) {
            modalWindow.showErrorMessage("Для запуска сортировки введите хотя бы 2 числа");
            return;
        }
        $("#inputPanel").addClass("hidden");
        $("#sortPanel").removeClass("hidden");
        sortingIsRunning = true;
        sorter = new Sorter(data);
    }

    function onRandBtnClick() {
        var getRandomInt = Utils.getRandomInt;
        var capacity = 10;
        var min = -999;
        var max = 999;

        for (var i = 0; i < capacity; i++) {
            data.push(getRandomInt(min, max));
        }

        $("#startBtn").click();
        render(data);
    }

    function onStepBtnClick() {
        sorter.nextStep();

        render(sorter.data, sorter.numbersSorted);

        if (sorter.isSwapped) {
            $("#screen p").eq(sorter.position).addClass("changed");
            $("#screen p").eq(sorter.position + 1).addClass("changed");
        }
        else {
            $("#screen p").eq(sorter.position).addClass("selected");
            $("#screen p").eq(sorter.position + 1).addClass("selected");
        }
    }

    function onKeyDown(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            if (sortingIsRunning) {
                $("#nextStepBtn").click();
            }
            else {
                $("#addNumberBtn").click();
            }
        }
    }

    function onResetBtnClick() {
        sortingIsRunning = false;
        sorter = null;
        data = [];
        render(data);
        $("#inputPanel").removeClass("hidden");
        $("#sortPanel").addClass("hidden");
        autosortIsRunning = false;
        clearInterval(intervalId);
        $("#autoSortBtn").text("Для ленивых");
    }

    function onAutoBtnClick() {
        autosortIsRunning = !autosortIsRunning;

        if (autosortIsRunning) {
            $("#autoSortBtn").text("Стоп");
            intervalId = setInterval(function() {
                if (sorter.numbersSorted < sorter.data.length) {
                    $("#nextStepBtn").click();
                }
                else {
                    clearInterval(intervalId);
                }
            }, 500);
        }
        else {
            clearInterval(intervalId);
            $("#autoSortBtn").text("Продолжить");
        }
    }
});