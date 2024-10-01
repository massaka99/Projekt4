// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import "@testing-library/jest-dom";
import "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

// Mock the window.matchMedia function
global.window.matchMedia = global.window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
}
// Mock the window.alert function
window.alert = jest.fn();

