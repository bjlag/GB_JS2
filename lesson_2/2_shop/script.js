'use strict';

/**
 * Класс Container
 */
function Container( id ) {
    if ( id !== undefined ) {
        this.id = id;
    }
    this.htmlCode = '';
}

Container.prototype.render = function () {
    return this.htmlCode;
};

Container.prototype.remove = function () {
    document.getElementById( this.id ).outerHTML = '';
};

/**
 * Класс Menu
 */
function Menu( id, className, items ) {
    Container.call( this, id ); // наследование свойств класса Container

    this.className = className;
    this.items = items;
}

// Наследование методов класса Container
Menu.prototype = Object.create( Container.prototype );
Menu.prototype.constructor = Menu; // Возвращаем конструктор, т.к. выше он был затерт

Menu.prototype.render = function () {
    var result = '<ul class="' + this.className + '" id="' + this.id + '">';
    for ( var i = 0; i < this.items.length; i++ ) {
        // Проверяем принадлежит ли элемент массива классу MenuItem
        if ( this.items[ i ] instanceof MenuItem || this.items[ i ] instanceof SubMenu ) {
            result += this.items[ i ].render();
        }
    }
    result += '</ul>';

    return result;
};

function MenuItem( href, title, classList, classLink ) {
    Container.call( this );

    this.href = href;
    this.title = title;
    this.classList = classList;
    this.classLink = classLink;
}

MenuItem.prototype = Object.create( Container.prototype );
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function () {
    return '<li class="' + this.classList + '"><a class="' + this.classLink + '" href="' + this.href + '">' + this.title + '</a></li>';
};

/**
 * Класс SubMenu
 */
function SubMenu( href, title, submenu, classMenu, classList, classLink ) {
    Menu.call( this );

    this.href = href;
    this.title = title;
    this.submenu = submenu;
    this.classMenu = classMenu;
    this.classList = classList;
    this.classLink = classLink;
}

SubMenu.prototype = Object.create( Menu.prototype );
SubMenu.prototype.constructor = SubMenu;

SubMenu.prototype.render = function () {
    var result = '<li class="' + this.classList + '"><a class="' + this.classLink + '" href="' + this.href + '">' + this.title + '</a>';

    result += '<ul class="' + this.classMenu + '">';

    if ( !Array.isArray( this.submenu ) || this.submenu.length === 0 ) return;

    for ( var i = 0; i < this.submenu.length; i++ ) {
        result += this.submenu[ i ].render();
    }

    result += '</ul></li>';

    return result;
};