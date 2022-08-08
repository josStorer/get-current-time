const mockMoment = {
    utcOffset: jest.fn().mockReturnThis(),
    format: jest.fn(),
    toISOString: jest.fn(),
    toString: jest.fn(),
    toArray: jest.fn()
};
jest.doMock('moment', () => () => mockMoment);

const mockCore = {
    getInput: jest.fn(),
    setOutput: jest.fn(),
    setFailed: jest.fn(),
};
jest.doMock('@actions/core', () => mockCore);

const action = require('./action.js');

describe("action", () => {
    it("Should load", () => {
        expect(action).not.toBeNull();
    });

    it("Should run with basic functionality", () => {
        mockMoment.toISOString.mockReturnValue('##');
        mockMoment.toString.mockReturnValue('##');
        mockMoment.format.mockReturnValue('##');
        action();
        expect(mockCore.setOutput).toHaveBeenCalledWith('time', '##');
        expect(mockCore.setOutput).toHaveBeenCalledWith('ISOTime', '##');
        expect(mockCore.setOutput).toHaveBeenCalledWith('readableTime', '##');
        expect(mockCore.setOutput).toHaveBeenCalledWith('formattedTime', '##');
    });

    it("Should run with other basic outputs", () => {
        mockMoment.toArray.mockReturnValue(['2020', '0', '1', '12', '0', '1', '2']);
        action();
        expect(mockCore.setOutput).toHaveBeenCalledWith('year', '2020');
        expect(mockCore.setOutput).toHaveBeenCalledWith('month', '1');
        expect(mockCore.setOutput).toHaveBeenCalledWith('day', '1');
        expect(mockCore.setOutput).toHaveBeenCalledWith('hour', '12');
        expect(mockCore.setOutput).toHaveBeenCalledWith('minute', '0');
        expect(mockCore.setOutput).toHaveBeenCalledWith('second', '1');
        expect(mockCore.setOutput).toHaveBeenCalledWith('millisecond', '2');
    });

    it("Should pass format inputs", () => {
        mockCore.getInput.mockReturnValue('###');
        action();
        expect(mockMoment.utcOffset).toHaveBeenCalledWith('###');
        expect(mockMoment.format).toHaveBeenCalledWith('###');
    });

    it("Should throw error", () => {
        mockMoment.utcOffset = () => { throw new Error('####') }
        action();
        expect(mockCore.setFailed).toHaveBeenCalledWith('####');
    });
});
