const mockCore = {
    setOutput: jest.fn(),
    setFailed: jest.fn()
}
jest.doMock('@actions/core', () => mockCore)

jest.spyOn(Date, 'now').mockReturnValue(new Date('2020-07-01T00:30:15.000Z'))

const action = require('./action.js')

describe('action', () => {
    it('Should load', () => {
        expect(action).not.toBeNull()
    })

    it('Should correctly set outputs', () => {
        jest.clearAllMocks()
        mockCore.getInput = jest.fn().mockImplementation((input) => {
            switch (input) {
                case 'utcOffset':
                    return ''
                case 'format':
                    return ''
                case 'timezone':
                    return ''
            }
        })
        action()
        expect(mockCore.setOutput.mock.calls).toEqual([
            ['time', '2020-07-01T00:30:15.000Z'],
            ['ISOTime', '2020-07-01T00:30:15.000Z'],
            ['readableTime', 'Wed Jul 01 2020 00:30:15 GMT+0000'],
            ['formattedTime', '2020-07-01T00:30:15Z'],
            ['year', 2020],
            ['month', 7],
            ['day', 1],
            ['hour', 0],
            ['minute', 30],
            ['second', 15],
            ['millisecond', 0]
        ])
    })

    it('Should correctly set outputs with utcOffset', () => {
        jest.clearAllMocks()
        mockCore.getInput = jest.fn().mockImplementation((input) => {
            switch (input) {
                case 'utcOffset':
                    return '+08:00'
                case 'format':
                    return 'YYYYMMDD-HH'
                case 'timezone':
                    return ''
            }
        })
        action()
        expect(mockCore.setOutput.mock.calls).toEqual([
            ['time', '2020-07-01T00:30:15.000Z'],
            ['ISOTime', '2020-07-01T00:30:15.000Z'],
            ['readableTime', 'Wed Jul 01 2020 08:30:15 GMT+0800'],
            ['formattedTime', '20200701-08'],
            ['year', 2020],
            ['month', 7],
            ['day', 1],
            ['hour', 8],
            ['minute', 30],
            ['second', 15],
            ['millisecond', 0]
        ])
    })

    it('Should correctly set outputs with timezone', () => {
        jest.clearAllMocks()
        mockCore.getInput = jest.fn().mockImplementation((input) => {
            switch (input) {
                case 'utcOffset':
                    return '+08:00'
                case 'format':
                    return 'YYYYMMDD-HH'
                case 'timezone':
                    return 'America/Los_Angeles'
            }
        })
        action()
        expect(mockCore.setOutput.mock.calls).toEqual([
            ['time', '2020-07-01T00:30:15.000Z'],
            ['ISOTime', '2020-07-01T00:30:15.000Z'],
            ['readableTime', 'Tue Jun 30 2020 17:30:15 GMT-0700'],
            ['formattedTime', '20200630-17'],
            ['year', 2020],
            ['month', 6],
            ['day', 30],
            ['hour', 17],
            ['minute', 30],
            ['second', 15],
            ['millisecond', 0]
        ])
    })

    it('Should throw error', () => {
        jest.clearAllMocks()
        mockCore.setOutput = () => {
            throw new Error('#')
        }
        action()
        expect(mockCore.setFailed).toHaveBeenCalledWith('#')
    })
})
