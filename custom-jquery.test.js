require("dotenv").config();

const path = require("path");

const jroot = path.resolve(__dirname, process.env.ROOT_PATH);

const $ = require(jroot);

describe("constructor", () => {
    it("call of constructor without new should be equal to ' new $'", () => {
        const $div = $("div");
        const $span = new $("span");

        expect(Object.getPrototypeOf($div)).toBe(Object.getPrototypeOf($span));
    });
});

describe("methods", () => {
    describe("addClass", () => {
        // Adds the specified class(es) to each element in the set of matched elements.
        // multiclass must be ignored
        beforeEach(() => {
            const mains = Array.from({ length: 4 }, () =>
                document.createElement("main")
            );

            document.body.appendChild(...mains);
        });

        it("should accept string as argument", () => {
            const $main = $("main");

            $main.addClass("class");

            document.querySelectorAll("main").forEach((el) => {
                expect(el.className).toBe("class");
            });
        });

        it("string may be space separated", () => {
            const $main = $("main");

            $main.addClass("class1 class2");

            document.querySelectorAll("main").forEach((el) => {
                expect(el.className).toBe("class1 class2");
            });
        });

        it("should accept function as argument", () => {
            const $main = $("main");
            const cb = () => "wow-class";

            $main.addClass(cb);

            document.querySelectorAll("main").forEach((el) => {
                expect(el.className).toBe("wow-class");
            });
        });
        it("function should be called with index and currentClassName", () => {
            const $main = $("main");
            const cb = jest.fn("wow-class-1");

            $main.addClass("wow-class");
            $main.addClass(cb);

            cb.mock.calls.forEach((call, i) => {
                expect(call[0]).toBe(i);
                expect(call[1]).toBe("wow-class");
            });
        });
        it("function may return space-separated string", () => {
            const $main = $("main");
            const cb = () => "wow-class wow-class-1";

            $main.addClass(cb);

            document.querySelectorAll("main").forEach((el) => {
                expect(el.className).toBe("wow-class wow-class-1");
            });
        });
        it("this must be pointed on current html element", () => {
            const $main = $("main");
            const mockCb = jest.fn(function (i, el) {
                return el === this;
            });

            $main.addClass(mockCb);

            mockCb.mock.results.forEach((result) => {
                expect(result.value).toBe(true);
            });
        });

        afterEach(() => (document.body.innerHTML = ""));
    });

    describe("append", () => {
        // Insert content, specified by the parameter, to the end of each element in the set of matched elements.

        it("Should insert string to the end of each element", () => {});
        it("Should insert Element to the end of each element", () => {});
        it("Should insert Array to the end of each element", () => {});
        it("Should insert jQuery to the end of each element", () => {});
        it("Should take infinite number of arguments", () => {});
        it("Should accept function as param", () => {});
        // add mock on .html
        it("Function must be called with index and current html content", () => {});
        it("This must be pointed on current html element", () => {});
    });
    describe("html", () => {
        //Get the HTML contents of the first element in the set of matched elements.
        it("Should return current html of the first element if no arguments provided", () => {});
        //Set the HTML contents of each element in the set of matched elements.
        it("Should set string to all arguments", () => {});
        it("Should accept function as argument", () => {});
        it("Should accept function as param", () => {});
        it("Function must be called with index and current html content", () => {});
        it("This must be pointed on current html element", () => {});
    });
    describe("attr", () => {
        //Get the value of an attribute for the first element in the set of matched elements
        it("Should return value of specified attribute", () => {});

        //Set one or more attributes for the set of matched elements.
        it("Should accept name/value as args", () => {});
        it("Should remove atrribute if value is null", () => {});

        it("Should accept object as argument", () => {});
        it("Should accept function as argument", () => {});
        it("Function must be called with index and current attribute value", () => {});
        it("This must be pointed on current html element", () => {});
    });
    describe("children", () => {
        // Get the children of each element in the set of matched elements, optionally filtered by a selector

        it("Should return collection of children", () => {});
        it("Collection of children should be filtered by selector", () => {});
    });
    describe("css", () => {
        // Get the computed style properties for the first element in the set of matched elements.
        it("Should accept string as argument", () => {});
        it("Should accept Array as argument", () => {});
        //Set one or more CSS properties for the set of matched elements.
        it("Should accept object as param", () => {});
        it("Should accept name/value as params", () => {});
        it("Should append name/function as params", () => {});
        it("Function must be called with index and current attribute value", () => {});
        it("This must be pointed on current html element", () => {});
    });

    describe("data", () => {
        // Store arbitrary data associated with the matched elements
        it("Should accept name/value as args", () => {});
        it("Should accept object as argument", () => {});

        //get
        it("Get data-* attribute of 1 matched element", () => {});
        it("Get all data-* attributes of 1 matched element", () => {});
    });
    describe("on", () => {
        it("on( events [, data ], handler )", () => {});
        it("on( events [, selector ] [, data ], handler )", () => {});
        it("on( events [, selector ] [, data ] )", () => {});
    });
    describe("one", () => {
        // same as .on but handler should be called only once.

        it("on( events [, data ], handler )", () => {});
        it("on( events [, selector ] [, data ], handler )", () => {});
        it("on( events [, selector ] [, data ] )", () => {});
    });

    describe("each", () => {
        beforeEach(() => {
            const imgs = Array.from({ length: 50 }, () =>
                document.createElement("img")
            );
            imgs.forEach((img) => document.body.appendChild(img));
        });
        //Iterate over a jQuery object, executing a function for each matched element
        it("Function should be called for each Element", () => {
            const mockCb = jest.fn();

            const $imgs = $("img");

            $imgs.forEach(mockCb);

            expect(mockCb.mock.calls.length).toBe(50);
        });
        it("Function must be called with index and Element", () => {
            const mockCb = jest.fn();

            const $imgs = $("img");

            $imgs.forEach(mockCb);

            mockCb.mock.calls.forEach((call, i) => {
                expect(call[0]).toBe(i);
                expect(call[1]).toBeInstanceOf(HTMLElement);
            });
        });
        it("This must be pointed on current Element element", () => {
            const mockCb = jest.fn(function (i, el) {
                return el === this;
            });

            const $imgs = $("img");

            $imgs.forEach(mockCb);

            mockCb.mock.results.forEach((result) => {
                expect(result.value).toBe(true);
            });
        });
        it("Iteration must be stopped when cb returns 'false'", () => {});

        afterEach(() => (document.body.innerHTML = ""));
    });
    describe("remove", () => {
        beforeEach(() => {
            const divs = Array.from({ length: 6 }, (_, i) => {
                const div = document.createElement("div");

                div.id = `awersome-id-${i}`;

                return div;
            });
            const spans = Array.from({ length: 6 }, () =>
                document.createElement("span")
            );

            [...divs, ...spans].forEach((el) => document.body.appendChild(el));
        });

        it("Should remove matched elements from DOM", () => {
            const $divs = $("div:not(:last-of-type)");

            $divs.remove();

            expect(document.querySelector("#awersome-id-5")).toBeInstanceOf(
                HTMLElement
            );
            expect(document.querySelectorAll("span").length).toBe(6);
            expect(document.querySelectorAll("div").length).toBe(1);
        });

        afterEach(() => (document.body.innerHTML = ""));
    });
    describe("hasClass", () => {
        //Determine whether any of the matched elements are assigned the given class
        beforeEach(() => {
            const div = document.createElement("div");
            const span = document.createElement("span");

            div.classList.add("wow-div");
            span.classList.add("wow-span");

            [div, span].forEach((el) => document.body.appendChild(el));
        });

        it("Should return true if some element has class, false otherwise", () => {
            const $collection = $("div,span");

            expect($collection.hasClass("wow-p")).toBe(false);
            expect($collection.hasClass("wow-div")).toBe(true);
            expect($collection.hasClass("wow-span")).toBe(true);
        });

        afterEach(() => (document.body.innerHTML = ""));
    });

    describe("get", () => {
        beforeEach(() => {
            const elems = Array.from({ length: 4 }, (_, index) => {
                const div = document.createElement("div");

                div.dataset.index = index;

                return div;
            });

            elems.forEach((el) => document.body.appendChild(el));
        });

        it("Should return array of matched element if no arguments provided", () => {
            const $div = $("div");
            const collection = $div.get();

            expect(collection).toBeInstanceOf(Array);
            expect(collection.length).toBe(4);
            collection.forEach((el) => expect(el).toBeInstanceOf(HTMLElement));
        });
        it("Should return element by specified index if its provided", () => {
            const $div = $("div");
            const elem1 = $div.get(1);
            const elem0 = $div.get(0);

            expect(elem1).toBeInstanceOf(HTMLElement);
            expect(elem1.dataset.index).toBe("1");

            expect(elem0).toBeInstanceOf(HTMLElement);
            expect(elem0.dataset.index).toBe("0");
        });
        it("Should count from the end of collection if index is negative", () => {
            const $div = $("div");
            const elem = $div.get(-1);

            expect(elem).toBeInstanceOf(HTMLElement);
            expect(elem.dataset.index).toBe("3");
        });

        it("Should return undefined if index is greater than the length or less than the negative number of elements", () => {
            const max = $("div").get(Number.MAX_SAFE_INTEGER);
            const min = $("div").get(-Number.MAX_SAFE_INTEGER);

            expect(max).toBe(undefined);
            expect(min).toBe(undefined);
        });

        afterEach(() => (document.body.innerHTML = ""));
    });
});
