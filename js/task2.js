document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.querySelector("#add");
    const removeButton = document.querySelector("#remove");

    // Функции для перетаскивания кнопок
    [addButton, removeButton].forEach(button => {
        button.setAttribute("draggable", "true");

        // Обработчик начала перетаскивания
        button.addEventListener("dragstart", (e) => {
            // Устанавливаем пустое изображение для предотвращения отображения фантома
            const emptyImage = new Image(); // Создаем пустое изображение
            emptyImage.src = ""; // Указываем пустой путь
            e.dataTransfer.setDragImage(emptyImage, 0, 0);

            // Сохраняем позицию начала перетаскивания
            e.dataTransfer.setData("text", "dragging");
            e.target.classList.add("dragging");
        });

        // Обработчик окончания перетаскивания
        button.addEventListener("dragend", (e) => {
            e.target.classList.remove("dragging");
        });

        // Обработчик перетаскивания элемента
        button.addEventListener("dragover", (e) => {
            e.preventDefault();
            const draggingButton = document.querySelector(".dragging");
            // Обновление позиции кнопки на экране
            draggingButton.style.position = "absolute";
            draggingButton.style.left = e.pageX - draggingButton.offsetWidth / 2 + "px";
            draggingButton.style.top = e.pageY - draggingButton.offsetHeight / 2 + "px";
        });
    });

    const liS = Array.from(document.querySelectorAll("#list li"));

    liS.forEach(li => {
        li.addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.classList.contains('active')) {
                return;
            }
            easy(li);
        });
    });

    // Добавление нового элемента
    document.querySelector("#add").addEventListener("click", (e) => {
        e.preventDefault();
        const newLi = document.createElement("li");
        newLi.setAttribute("draggable", "true");

        newLi.addEventListener("click", (e) => {
            e.preventDefault();
            easy(newLi);
        });

        const newA = document.createElement("a");
        const list = document.querySelector("#list");

        let lastNumber = +list
            .lastElementChild
            .innerText
            .split(' ')[1];

        newA.innerText = 'Item ' + ++lastNumber;
        newA.setAttribute("href", lastNumber.toString());

        newLi.appendChild(newA);
        list.appendChild(newLi);

        // Добавить обработчики для нового элемента
        addDragAndDropHandlers(newLi);
    });

    // Удаление элемента
    document.querySelector("#remove").addEventListener("click", (e) => {
        e.preventDefault();
        const list = document.querySelector("#list");
        const lastChild = list.lastElementChild;

        if (lastChild.querySelector('a').classList.contains('active')) {
            list.firstElementChild.querySelector('a').classList.add('active');
        }
        list.removeChild(lastChild);
    });

    // Легкий выбор элемента
    function easy(li) {
        const allLi = document.querySelectorAll("#list li");
        allLi.forEach(li => {
            li.querySelector("a").classList.remove("active");
        });
        li.querySelector("a").classList.add("active");
    }

    // Функция для добавления обработчиков drag-and-drop для нового li
    function addDragAndDropHandlers(li) {
        li.addEventListener("dragstart", (e) => {
            const emptyImage = new Image();
            emptyImage.src = "";
            e.dataTransfer.setDragImage(emptyImage, 0, 0);

            e.dataTransfer.setData("text", li.innerHTML);
            li.classList.add("dragging");
        });

        li.addEventListener("dragend", () => {
            li.classList.remove("dragging");
        });
    }
});
