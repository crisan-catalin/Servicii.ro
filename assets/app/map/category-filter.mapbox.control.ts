import { EventEmitter } from "events";

export class CategoryFilterMapControl {

    categoryChangedEventEmitter = new EventEmitter();

    constructor(private _map, private _container, private categories) { }

    setCategories(categories) {
        var selectControl = document.getElementById('select-control');
        while (selectControl.firstChild) {
            selectControl.removeChild(selectControl.firstChild)
        }

        var option = document.createElement('option');
        // workaround to show all markers with this class 
        option.value = "marker"
        option.text = "Toate categoriile";
        selectControl.appendChild(option);

        selectControl.appendChild(option);
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

        let categoryChangedEventEmitter = this.categoryChangedEventEmitter;
        selectControl.addEventListener('change', function(e) {
            categoryChangedEventEmitter.emit('category-changed', e.target.value);
        });

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