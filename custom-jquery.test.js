require('dotenv').config();

const path = require('path');

const jroot = path.resolve(__dirname, process.env.ROOT_PATH);

const $ = require(jroot);

describe('constructor', () => {
    it('call of constructor without new should be equal to \' new $\'', () => {
        const $div = $('div');
        const $span = new $('span');

        expect(Object.getPrototypeOf($div)).toBe(Object.getPrototypeOf($span));
    });
});

describe('methods', () => {
    describe('addClass', () => {
        // Adds the specified class(es) to each element in the set of matched elements.
        // multiclass must be ignored
        beforeEach(() => {
            const mains = Array.from({ length: 4 }, () => document.createElement('main'));

            document.body.append(...mains);
        });

        it('should accept string as argument', () => {
            const $main = $('main');

            $main.addClass('class');

            document.querySelectorAll('main').forEach(el => {
                expect(el.className).toBe('class');
            });
        });

        it('string may be space separated', () => {
            const $main = $('main');

            $main.addClass('class1 class2');

            document.querySelectorAll('main').forEach(el => {
                expect(el.className).toBe('class1 class2');
            });
        });

        it('should accept function as argument', () => {
            const $main = $('main');
            const cb = () => 'wow-class';

            $main.addClass(cb);

            document.querySelectorAll('main').forEach(el => {
                expect(el.className).toBe('wow-class');
            });
        });
        it('function should be called with index and currentClassName', () => {
            const $main = $('main');
            const cb = jest.fn('wow-class-1');

            $main.addClass('wow-class');
            $main.addClass(cb);

            cb.mock.calls.forEach((call, i) => {
                expect(call[0]).toBe(i);
                expect(call[1]).toBe('wow-class');
            });
        });
        it('function may return space-separated string', () => {
            const $main = $('main');
            const cb = () => 'wow-class wow-class-1';

            $main.addClass(cb);

            document.querySelectorAll('main').forEach(el => {
                expect(el.className).toBe('wow-class wow-class-1');
            });
        });
        it('this must be pointed on current html element', () => {
            const $main = $('main');
            const mockCb = jest.fn(function (i, el) {
                return el === this;
            });

            $main.addClass(mockCb);

            mockCb.mock.results.forEach((result) => {
                expect(result.value).toBe(true);
            });
        });

        afterEach(() => document.body.innerHTML = '');
    });

    describe('append', () => {
        // Insert content, specified by the parameter, to the end of each element in the set of matched elements.
        beforeEach(() => {
            const divs = Array.from({ length: 3 }, () => document.createElement('div'));

            document.body.appendChild(...divs);
        });

        it('Should insert string to the end of each element', () => {
            const $div = $('div');
            const testString = 'new string';

            $div.append(testString);

            document.querySelectorAll('div').forEach(el => {
                expect(el.innerHTML.includes(testString, -testString.length)).toBe(true);
            });
        });

        it('Should insert Element to the end of each element', () => {
            const $div = $('div');
            const testElement = document.createElement('span');

            $div.append(testElement);

            document.querySelectorAll('div').forEach(el => {
                expect(el.lastChild).toEqual(testElement);
            });
        });

        it('Should insert Array to the end of each element', () => {
            const $div = $('div');
            $div.innerHTML = '<p>array</p>';
            const testArray = [1, 2, 3];

            $div.append(testArray);

            document.querySelectorAll('div').forEach(el => {
                expect(el.innerHTML.includes(testArray.join(''), -testArray.length)).toBe(true);
            });
        });

        it('Should insert jQuery to the end of each element', () => {
            const $div = $('div');
            $div.innerHTML = '<p>hi</p>';
            const element = document.createElement('p');
            element.innerHTML = 'hello';
            const testJquery = $(element);

            $div.append(testJquery);

            document.querySelectorAll('div').forEach(el => {
                expect(el.lastChild).toEqual(element);
            });
        });

        it('Should take infinite number of arguments', () => {
            const $div = $('div');
            const element = document.createElement('p');

            for (let i = 0; i < 100; i++) {
                element.innerHTML = i.toString();
                $div.append(element);
            }

            document.querySelectorAll('div').forEach(el => {
                expect(el.lastChild).toEqual(element);
            });
        });

        it('Should accept function as param', () => {
            const $div = $('div');
            const element = document.createElement('p');
            element.innerHTML = 'function';
            const cb = (el) => el;

            $div.append(cb(element));

            document.querySelectorAll('div').forEach(el => {
                expect(el.lastChild).toStrictEqual(element);
            });
        });

        // add mock on .html
        it('Function must be called with index and current html content', () => {
            const $div = $('div');
            const element = document.createElement('p');
            element.innerHTML = 'Hello world!';
            const cb = jest.fn(() => element);

            $div.append(element);
            $div.append(cb);
            cb.mock.calls.forEach((call, i) => {
                expect(call[0]).toBe(i);
                expect(call[1]).toEqual('<p>Hello world!</p>');
            });
        });

        it('This must be pointed on current html element', () => {
            const $div = $('div');
            const testElement = document.createElement('span');

            $div.append(testElement);

            document.querySelectorAll('div').forEach(el => {
                expect(el.lastChild).toBeInstanceOf(HTMLSpanElement);
            });
        });
      
        afterEach(() => document.body.innerHTML = '');
    });

    describe('html', () => {
        let $div;

        beforeEach(() => {
            document.body.innerHTML = '<div><span>Test div1</span></div><div><span>Test div2</span></div>';
            $div = $('div');
        });

        //Get the HTML contents of the first element in the set of matched elements.
        it('Should return current html of the first element if no arguments provided', () => {
            expect($div.html()).toBe('<span>Test div1</span>');
        });
        
        //Set the HTML contents of each element in the set of matched elements.
        it('Should set string to all arguments', () => {
            $div.html('<p>Updated text</p>');
            document.querySelectorAll('div').forEach(el => {
                expect(el.innerHTML).toBe('<p>Updated text</p>');
            });
        });

        it('Should accept function as argument', () => {
            const cb = jest.fn((index, prevHtml) => `<p>${index}: ${prevHtml}</p>`);
            const divList = document.querySelectorAll('div');

            $div.html(cb);

            expect(cb).toHaveBeenCalledTimes(divList.length);
            divList.forEach((el, i) => {
                expect(el.innerHTML).toBe(`<p>${i}: <span>Test div${i+1}</span></p>`);
            });     
        });

        it('Should accept function as param', () => {
            const cb = jest.fn(() => `<p>Updated text</p>`);
            expect(() => $div.html(cb)).not.toThrow();
        });

        it('Function must be called with index and current html content', () => {
            const cb = jest.fn((index, html) => `<p>${index}: ${html}</p>`);
            $div.html(cb);

            cb.mock.calls.forEach((call, i) => {
                expect(call[0]).toBe(i);
                expect(call[1]).toEqual(`<span>Test div${i+1}</span>`);
            });
        });

        it('This must be pointed on current html element', () => {
            const cb = jest.fn(function () {
                expect(this).toBeInstanceOf(HTMLDivElement);
            });
    
            $div.html(cb);
        });

        afterEach(() => document.body.innerHTML = '');
    });
    describe('attr', () => {
        let $div;
        let divElement;

        beforeEach(() => {
            document.body.innerHTML = '<div id="test"></div>'
            divElement = document.querySelector('div');
            $div = $('div');
        });
        //Get the value of an attribute for the first element in the set of matched elements
        it('Should return value of specified attribute', () => {
            expect($div.attr('id')).toBe('test');
        });

        //Set one or more attributes for the set of matched elements.
        it('Should accept name/value as args', () => {
            $div.attr('data-test', 'value');
            expect(divElement.getAttribute('data-test')).toBe('value');
        });
        it('Should remove attribute if value is null', () => {
            $div.attr('id', null);
            expect(divElement.hasAttribute('id')).toBe(false);
        });
        it('Should accept object as argument', () => {
            $div.attr({ 'data-test': 'value', 'role': 'button' });

            expect(divElement.getAttribute('data-test')).toBe('value');
            expect(divElement.getAttribute('role')).toBe('button');
        });
        it('Should accept function as argument', () => {
            const cb = jest.fn((index, prevAttr) => `${prevAttr}-new${index + 1}`);

            $div.attr('id', cb);
            expect(cb).toHaveBeenCalledTimes(1);
            expect(divElement.getAttribute('id')).toBe('test-new1');
        });
        it('Function must be called with index and current attribute value', () => {
            const cb = jest.fn((index, prevAttr) => prevAttr + '-new');

            $div.attr('id', cb);

            expect(cb).toHaveBeenCalledWith(0, 'test');
            expect(divElement.getAttribute('id')).toBe('test-new');
            
        });
        it('This must be pointed on current html element', () => {
            const cb = jest.fn(function () {
                expect(this).toBeInstanceOf(HTMLDivElement);
            });
            
            $div.attr('id', cb);
            expect(cb).toHaveBeenCalledTimes(1); 
        });

        afterEach(() => document.body.innerHTML = '');
    });
    describe('children', () => {
        const mainClassName = 'mainElt';
        const childDivClassName = 'childDiv';
        const selectedClassName = 'selected';

        // Get the children of each element in the set of matched elements, optionally filtered by a selector
        beforeEach(() => {
            const main = document.createElement('main');
            main.classList.add(mainClassName);

            const childDiv1 = document.createElement('div');
            const childDiv2 = document.createElement('div');
            const childDiv3 = document.createElement('div');
            const childDiv4 = document.createElement('div');

            childDiv1.classList.add(childDivClassName, selectedClassName);
            childDiv2.classList.add(childDivClassName, selectedClassName);
            childDiv3.classList.add(childDivClassName);
            childDiv4.classList.add(childDivClassName, selectedClassName);

            main.append(childDiv1, childDiv2, childDiv3, childDiv4);
            document.body.append(main);
        });

        it('Should return collection of children', () => {
            const main = $(`main.${mainClassName}`);
            const children = main.children();
          
            expect(children.length).toBe(4);

            children.each((i, childElt) => {
                expect(childElt.classList.contains(childDivClassName)).toBe(true);
            });
        });
      
        it('Collection of children should be filtered by selector', () => {
            const main = $(`main.${mainClassName}`);
            const children = main.children(`.${selectedClassName}`);

            expect(children.length).toBe(3);

            children.each((i, childElt) => {
                expect(childElt.classList.contains(childDivClassName)).toBe(true);
                expect(childElt.classList.contains(selectedClassName)).toBe(true);
            });
        });

        afterEach(() => document.body.innerHTML = '');
    });
    describe('css', () => {
        // Get the computed style properties for the first element in the set of matched elements.
        it('Should accept string as argument', () => { });
        it('Should accept Array as argument', () => { });
        //Set one or more CSS properties for the set of matched elements.
        it('Should accept object as param', () => { });
        it('Should accept name/value as params', () => { });
        it('Should append name/function as params', () => { });
        it('Function must be called with index and current attribute value', () => { });
        it('This must be pointed on current html element', () => { });
    });

    describe('data', () => {
        beforeEach(() => {
            const mains = Array.from({ length: 4 }, () => document.createElement('main'));
            mains.forEach(el => el.dataset.jqry = 'here');

            document.body.appendChild(...mains);
        });

        it('Should accept name/value as args', () => {
            const $mains = $('main').data('foo', 'fo');

            expect($mains.data()['foo']).toBe('fo');
        });

        it('Should accept object as argument', () => {
            const $mains = $('main').data({ foo: 'fo', tinker: 'shiva' });

            expect($mains.data()['foo']).toBe('fo');
            expect($mains.data()['tinker']).toBe('shiva');
        });

        it('Get data-* attribute of 1 matched element', () => {
            const $mains = $('main').data({ atr: 'foo', bee: 'piy' });

            expect(Object.entries($mains.data()).length).toBe(2);
            expect($mains.data()['atr']).toBe('foo');
        });

        it('Get all data-* attributes of 1 matched element', () => {
            const $mains = $('main').data({ ou: 'wou', wow: 'ou' });

            expect(Object.entries($mains.data()).length).toBe(3);
        });

        afterEach(() => document.body.innerHTML = '');
    });
    describe('on', () => {
        it('on( events [, data ], handler )', () => { });
        it('on( events [, selector ] [, data ], handler )', () => { });
        it('on( events [, selector ] [, data ] )', () => { });
    });
    describe('one', () => {
        // same as .on but handler should be called only once.

        it('on( events [, data ], handler )', () => { });
        it('on( events [, selector ] [, data ], handler )', () => { });
        it('on( events [, selector ] [, data ] )', () => { });
    });

    describe('each', () => {
        beforeEach(() => {
            const imgs = Array.from({ length: 50 }, () => document.createElement('img'));
            imgs.forEach(img => document.body.appendChild(img));
        });
        //Iterate over a jQuery object, executing a function for each matched element
        it('Function should be called for each Element', () => {
            const mockCb = jest.fn();

            const $imgs = $('img');

            $imgs.forEach(mockCb);

            expect(mockCb.mock.calls.length).toBe(50);
        });
        it('Function must be called with index and Element', () => {
            const mockCb = jest.fn();

            const $imgs = $('img');

            $imgs.forEach(mockCb);

            mockCb.mock.calls.forEach((call, i) => {
                expect(call[0]).toBe(i);
                expect(call[1]).toBeInstanceOf(HTMLElement);
            });
        });
        it('This must be pointed on current Element element', () => {
            const mockCb = jest.fn(function (i, el) {
                return el === this;
            });

            const $imgs = $('img');

            $imgs.forEach(mockCb);

            mockCb.mock.results.forEach((result) => {
                expect(result.value).toBe(true);
            });
        });
        it('Iteration must be stopped when cb returns \'false\'', () => { });

        afterEach(() => document.body.innerHTML = '');
    });
    describe('remove', () => {
        beforeEach(() => {
            const divs = Array.from({ length: 6 }, (_, i) => {
                const div = document.createElement('div');

                div.id = `awersome-id-${i}`;

                return div;
            });
            const spans = Array.from({ length: 6 }, () => document.createElement('span'));

            [...divs, ...spans].forEach(el => document.body.appendChild(el));
        });

        it('Should remove matched elements from DOM', () => {
            const $divs = $('div:not(:last-of-type)');

            $divs.remove();

            expect(document.querySelector('#awersome-id-5')).toBeInstanceOf(HTMLElement);
            expect(document.querySelectorAll('span').length).toBe(6);
            expect(document.querySelectorAll('div').length).toBe(1);
        });

        afterEach(() => document.body.innerHTML = '');
    });
    describe('hasClass', () => {
        //Determine whether any of the matched elements are assigned the given class
        beforeEach(() => {
            const div = document.createElement('div');
            const span = document.createElement('span');

            div.classList.add('wow-div');
            span.classList.add('wow-span');

            [div, span].forEach(el => document.body.appendChild(el));
        });

        it('Should return true if some element has class, false otherwise', () => {
            const $collection = $('div,span');

            expect($collection.hasClass('wow-p')).toBe(false);
            expect($collection.hasClass('wow-div')).toBe(true);
            expect($collection.hasClass('wow-span')).toBe(true);
        });

        afterEach(() => document.body.innerHTML = '');
    });

    describe('get', () => {
        beforeEach(() => {
            const elems = Array.from({ length: 4 }, (_, index) => {
                const div = document.createElement('div');

                div.dataset.index = index;

                return div;
            });

            elems.forEach(el => document.body.appendChild(el));
        });

        it('Should return array of matched element if no arguments provided', () => {
            const $div = $('div');
            const collection = $div.get();

            expect(collection).toBeInstanceOf(Array);
            expect(collection.length).toBe(4);
            collection.forEach(el => expect(el).toBeInstanceOf(HTMLElement));

        });
        it('Should return element by specified index if its provided', () => {
            const $div = $('div');
            const elem1 = $div.get(1);
            const elem0 = $div.get(0);

            expect(elem1).toBeInstanceOf(HTMLElement);
            expect(elem1.dataset.index).toBe('1');

            expect(elem0).toBeInstanceOf(HTMLElement);
            expect(elem0.dataset.index).toBe('0');
        });
        it('Should count from the end of collection if index is negative', () => {
            const $div = $('div');
            const elem = $div.get(-1);

            expect(elem).toBeInstanceOf(HTMLElement);
            expect(elem.dataset.index).toBe('3');
        });

        it('Should return undefined if index is greater than the length or less than the negative number of elements', () => {
            const max = $('div').get(Number.MAX_SAFE_INTEGER);
            const min = $('div').get(-Number.MAX_SAFE_INTEGER);

            expect(max).toBe(undefined);
            expect(min).toBe(undefined);
        });

        afterEach(() => document.body.innerHTML = '');
    });
});
