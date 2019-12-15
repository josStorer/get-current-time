const mockMoment = {
    format: jest.fn()
};
jest.doMock('moment', () => () => mockMoment);

const mockCore = {
    getInput: jest.fn(),
    setOutput: jest.fn(),
    setFailed: jest.fn(),
};
jest.doMock('@actions/core', () => mockCore);

const mockDate = {
    toISOString: jest.fn(),
};
Date = function () { return mockDate; }

const action = require('./action.js');

describe("action", () => {
    it("Should load", () => {
        expect(action).not.toBeNull();
    });

    it("Should run with original functionality", () => {
        mockDate.toISOString.mockReturnValue('##');
        action();
        expect(mockCore.setOutput).toHaveBeenCalledWith('time', '##');
    });

    it("Should run with format", () => {
        mockMoment.format.mockReturnValue('###');
        action();
        expect(mockCore.setOutput).toHaveBeenCalledWith('formattedTime', '###');
    });

    it("Should pass format input", () => {
        mockCore.getInput.mockReturnValue('###');
        action();
        expect(mockMoment.format).toHaveBeenCalledWith('###');
    });
});
