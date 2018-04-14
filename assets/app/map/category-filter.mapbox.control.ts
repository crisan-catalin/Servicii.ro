export class CategoryFilterMapControl {

    // TODO: Add eventListener for select onChange
    constructor(private _map, private _container, private categories) { }

    setCategories(categories) {
        var selectControl = document.getElementById('select-control');
        while (selectControl.firstChild) {
            selectControl.removeChild(selectControl.firstChild)
        }

        for (const category of categories) {
            var option = document.createElement('option');
            option.value = category.name;
            option.text = category.name;

            selectControl.appendChild(option);
        }
    }

    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.classList.add('mapboxgl-ctrl');
        this._container.classList.add("padding-top-sm");
        this._container.classList.add("padding-bottom-sm");
        this._container.classList.add("padding-left-sm");
        this._container.classList.add("padding-right-sm");
        this._container.classList.add("bg-primary");
        this._container.classList.add("btn-rounded");

        var title = document.createElement("h4");
        title.textContent = 'Filtreaza dupa categorie';
        this._container.appendChild(title);

        var selectControl = document.createElement('select');
        selectControl.id = 'select-control';
        selectControl.className = "form-control";

        for (const key in this.categories) {
            let categoryName = this.categories[key];
            var option = document.createElement('option');
            option.value = categoryName;
            option.text = categoryName;

            selectControl.appendChild(option);
        }

        this._container.appendChild(selectControl);

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}