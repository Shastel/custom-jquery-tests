require('dotenv').config();

const path = require('path');

const jroot = path.resolve(__dirname, process.env.ROOT_PATH);

const $ = require(jroot);

describe('constructor', () => {
    it('call of constructo without new should be equal to \' new $\'', () => {
        const $div = $('div');
        const $span = new $('span');

        expect(Object.getPrototypeOf($div)).toBe(Object.getPrototypeOf($span));
    });
});

describe('methods', () => {
    describe('addClass', () => {
        // Adds the specified class(es) to each element in the set of matched elements.

        it('should accept string as argument', () => {});
        it('string may be space separated', () => {});
        it('should accept function as argument', () => {});
        it('function should be called with Integer index, String currentClassName', () => {});
        it('function may return spaceseparated string', () => {});
        it('this must be pointed on current html element', () => {});
    });

    describe('append', () => {
        // Insert content, specified by the parameter, to the end of each element in the set of matched elements.

        it('Should insert string to the end of each element', () => {});
        it('Should insert Element to the end of each element', () => {});
        it('Should insert Array to the end of each element', () => {});
        it('Should insert jQuery to the end of each element', () => {});
        it('Should take infinite number of arguments', () => {});
        it('Should accept function as param', () => {});
        // add mock on .html
        it('Function must be called with index and current html content', () => {});
        it('This must be pointed on current html element', () => {});

    });
    describe('html', () => {
        //Get the HTML contents of the first element in the set of matched elements.
        it('Should retrun current html of the first element if no arguments provided', () => {});
        //Set the HTML contents of each element in the set of matched elements.
        it('Should set string to all arguments', () => {});
        it('Should accept function as argument', () => {});
        it('Should accept function as param', () => {});
        it('Function must be called with index and current html content', () => {});
        it('This must be pointed on current html element', () => {});
    });
    describe('attr', () => {
        //Get the value of an attribute for the first element in the set of matched elements
        it('Should return value of specified attribute', () => {});

        //Set one or more attributes for the set of matched elements.
        it('Should accept name/value as args', () => {});
        it('Should remove atrribute if value is null', () => {});

        it('Should accept object as argument', () => {});
        it('Should accept function as argument', () => {});
        it('Function must be called with index and current attribute value', () => {});
        it('This must be pointed on current html element', () => {});
    });
    describe('children', () => {
        // Get the children of each element in the set of matched elements, optionally filtered by a selector

        it('Should return collection of children', () => {});
        it('Collection of children should be filtered by selector', () => {});
    });
    describe('css', () => {
        // Get the computed style properties for the first element in the set of matched elements.
        it('Should accept string as argument', () => {});
        it('Should accept Array as argument', () => {});
        //Set one or more CSS properties for the set of matched elements.
        it('Should accept object as param', () => {});
        it('Should accept name/value as params', () => {});
        it('Should append name/function as params', () => {});
        it('Function must be called with index and current attribute value', () => {});
        it('This must be pointed on current html element', () => {});
    });

    describe('data', () => {
        // Store arbitrary data associated with the matched elements
        it('Should accept name/value as args', () => {});
        it('Should accept object as argument', () => {});

        //get
        it('Get data-* attribute of 1 matched element', () => {});
        it('Get all data-* attributes of 1 matched element', () => {});
    });
    describe('on', () => {
        it('on( events [, data ], handler )', () => {});
        it('on( events [, selector ] [, data ], handler )', () => {});
        it('on( events [, selector ] [, data ] )', () => {});
    });
    describe('one', () => {
        // same as .on but handler should be called only once.

        it('on( events [, data ], handler )', () => {});
        it('on( events [, selector ] [, data ], handler )', () => {});
        it('on( events [, selector ] [, data ] )', () => {});
    });

    describe('each', () => {
        //Iterate over a jQuery object, executing a function for each matched element
        it('Function should be called for each Element', () => {});
        it('Function must be called with index and Element', () => {});
        it('This must be pointed on current Element element', () => {});
        it('Iteration must be stopped when cb returns \'false\'', () => {});
    });
    describe('remove', () => {
        it('Should remove matched elements from DOM', () => {});
    });
    describe('hasClass', () => {
        //Determine whether any of the matched elements are assigned the given class
        it('Should return true if some element have class, false othervise', () => {});
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
        it('Should return element by specified index if it provided', () => {
            const $div = $('div');
            const elem1 = $div.get(1);
            const elem0 = $div.get(0);

            expect(elem1).toBeInstanceOf(HTMLElement);
            expect(elem1.dataset.index).toBe('1');

            expect(elem0).toBeInstanceOf(HTMLElement);
            expect(elem0.dataset.index).toBe('0');
        });
        it('Should count from end of collection if index is negative', () => {
            const $div = $('div');
            const elem = $div.get(-1);

            expect(elem).toBeInstanceOf(HTMLElement);
            expect(elem.dataset.index).toBe('3');
        });

        it('Should return undefined if index is grather than length or less than the negative number of elements', () => {
            const max = $('div').get(Number.MAX_SAFE_INTEGER);
            const min = $('div').get(-Number.MAX_SAFE_INTEGER);

            expect(max).toBe(undefined);
            expect(min).toBe(undefined);
        });
    });
});
