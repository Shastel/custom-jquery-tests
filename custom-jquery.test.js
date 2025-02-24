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
        //Get the HTML contents of the first element in the set of matched elements.
        it('Should return current html of the first element if no arguments provided', () => { });
        //Set the HTML contents of each element in the set of matched elements.
        it('Should set string to all arguments', () => { });
        it('Should accept function as argument', () => { });
        it('Should accept function as param', () => { });
        it('Function must be called with index and current html content', () => { });
        it('This must be pointed on current html element', () => { });
    });
    describe('attr', () => {
        //Get the value of an attribute for the first element in the set of matched elements
        it('Should return value of specified attribute', () => { });

        //Set one or more attributes for the set of matched elements.
        it('Should accept name/value as args', () => { });
        it('Should remove atrribute if value is null', () => { });

        it('Should accept object as argument', () => { });
        it('Should accept function as argument', () => { });
        it('Function must be called with index and current attribute value', () => { });
        it('This must be pointed on current html element', () => { });
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
        let $div, mockHandler, data;

        beforeEach(() => {
            $div = document.createElement('div');
            $div.innerHTML = '<p>click me</p>';
            document.body.appendChild($div);

            mockHandler = jest.fn();
            data = { foo: 'bar' };
        });

        afterEach(() => {
            document.body.innerHTML = '';
        });

        describe('on( events [, data ], handler )', () => {
            it('should add event handler with data and trigger it on every event', () => {
                $div.on('click', data, mockHandler);

                $div.dispatchEvent(new Event('click'));
                $div.dispatchEvent(new Event('click'));

                expect(mockHandler).toHaveBeenCalledTimes(2);
                expect(mockHandler.mock.calls[0][0].data).toEqual(data);
            });

            it('should handle multiple events on the same element', () => {
                const mockMouseHandler = jest.fn();
                $div.on('click', data, mockHandler);
                $div.on('mouseenter', data, mockMouseHandler);

                $div.dispatchEvent(new Event('click'));
                $div.dispatchEvent(new Event('mouseenter'));

                expect(mockHandler).toHaveBeenCalledTimes(1);
                expect(mockMouseHandler).toHaveBeenCalledTimes(1);
            });

            it('should handle null or undefined arguments gracefully', () => {
                $div.on('click', null, mockHandler);
                $div.dispatchEvent(new Event('click'));

                expect(mockHandler).toHaveBeenCalledTimes(1);
            });
        });

        describe('on( events [, selector ] [, data ], handler )', () => {
            it('should add event handler using delegation with data and trigger it on every event', () => {
                const $p = $div.querySelector('p');

                $div.on('click', 'p', data, mockHandler);
                $p.dispatchEvent(new Event('click'));
                $p.dispatchEvent(new Event('click'));

                expect(mockHandler).toHaveBeenCalledTimes(2);
                expect(mockHandler.mock.calls[0][0].data).toEqual(data);
            });

            it('should trigger event handler on the parent element', () => {
                const $p = $div.querySelector('p');

                $div.on('click', 'p', data, mockHandler);
                $p.dispatchEvent(new Event('click'), { bubbles: true });

                expect(mockHandler).toHaveBeenCalledTimes(1);
                expect(mockHandler.mock.calls[0][0].data).toEqual(data);
            });
        });

        describe('on( events [, selector ] [, data ] )', () => {
            it('should pass event data when an event occurs', () => {
                const $p = $div.querySelector('p');

                $div.on('click', 'p', data);
                $p.dispatchEvent(new Event('click'), { bubbles: true });

                expect(mockHandler).not.toHaveBeenCalled();
                expect($p.dataset.foo).toEqual(data.foo);
            });
        });
    });

    describe('one', () => {
        let $div, mockHandler, data;

        beforeEach(() => {
            $div = document.createElement('div');
            $div.innerHTML = '<p>click me</p>';
            document.body.appendChild($div);

            mockHandler = jest.fn();
            data = { foo: 'bar' };
        });

        afterEach(() => {
            document.body.innerHTML = '';
        });

        describe('one( events [, data ], handler )', () => {
            it('should add event handler with data and trigger it only once', () => {
                $div.one('click', data, mockHandler);

                $div.dispatchEvent(new Event('click'));
                $div.dispatchEvent(new Event('click'));

                expect(mockHandler).toHaveBeenCalledTimes(1);
                expect(mockHandler.mock.calls[0][0].data).toEqual(data);
            });
        });

        describe('one( events [, selector ] [, data ], handler )', () => {
            it('should add event handler using delegation with data and trigger it only once', () => {
                const $p = $div.querySelector('p');

                $div.one('click', 'p', data, mockHandler);
                $div.dispatchEvent(new Event('click'));
                $div.dispatchEvent(new Event('click'));

                expect(mockHandler).toHaveBeenCalledTimes(1);
                expect(mockHandler.mock.calls[0][0].data).toEqual(data);
            });
        });

        describe('one( events [, selector ] [, data ] )', () => {
            it('should store data but not bind event handler when no handler is provided', () => {
                const $p = $div.querySelector('p');

                $div.one('click', 'p', data);
                $p.dispatchEvent(new Event('click'), { bubbles: true });

                expect(mockHandler).not.toHaveBeenCalled();
                expect($p.dataset.foo).toEqual(data.foo);
            });
        });
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
