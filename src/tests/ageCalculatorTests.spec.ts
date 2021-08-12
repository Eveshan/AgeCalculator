import each from 'jest-each'
import { AgeCalculator } from '../CalculateAge';

describe('CalculatorAge', () => {
    each([[new Date(2000, 1, 1), new Date(2001, 1, 1), 1],
    [new Date(2000, 1, 1), new Date(2002, 1, 1), 2],
    [new Date(2000, 1, 1), new Date(2003, 1, 1), 3]
    ])
        .it('GivenDateAfterDateOfBirth_ShouldReturnDifference', (dob, target, expected) => {
            // Arrange
            let ageCalculator = CreateAgeCalculator();
            // Act
            let age = ageCalculator.CalculateAge(dob, target);

            // Assert
            expect(age).toEqual(expected);
        });

    it('Given1YearAnd1DayAfterDateOfBirth_ShouldReturn1', () => {
        // Arrange
        let dob = new Date(2000, 1, 1);
        let target = new Date(2001, 1, 2);

        let ageCalculator = CreateAgeCalculator();
        // Act
        let age = ageCalculator.CalculateAge(dob, target);

        // Assert
        expect(age).toEqual(1);
    });

    it('GivenDateInSameYearOfDateOfBirth_ShouldReturn0', () => {
        // Arrange
        let dob = new Date(2000, 1, 1);
        let target = new Date(2000, 1, 2);

        let ageCalculator = CreateAgeCalculator();
        // Act
        let age = ageCalculator.CalculateAge(dob, target);

        // Assert
        expect(age).toEqual(0);
    });

    it('GivenMonthAfterBirthdayMonth_ShouldReturn0', () => {
        // Arrange
        let dob = new Date(2000, 1, 1);
        let target = new Date(2000, 2, 2);

        let ageCalculator = CreateAgeCalculator();
        // Act
        let age = ageCalculator.CalculateAge(dob, target);

        // Assert
        expect(age).toEqual(0);
    });

    each([[new Date(2000, 1, 1), new Date(1999, 12, 31), 'Date of birth is after target date!'],
    [new Date(2000, 1, 1), new Date(1996, 1, 1), 'Date of birth is after target date!'],
    ])
        .it('GivenDateBeforeBirthday_ShouldThrowError', (dob, target, expected) => {
            // Arrange
            let ageCalculator = CreateAgeCalculator();

            // Act
            expect(() => { ageCalculator.CalculateAge(dob, target); }).toThrowError('Date of birth is after target date!');
        });
});


describe(('BirthdayWeek'), () => {

    each([[new Date(1987, 7, 7), '2021-08-01'],
    [new Date(1987, 7, 5), '2021-08-01'],
    [new Date(1993, 3, 8), '2021-04-04'],
    ])
        .it('GivenBirthdayIsBetweenThursdayAndSaturday_ShouldReturnTheDateOfSunday', (dob, expected) => {
        // Arrange
        let ageCalculator = CreateAgeCalculator();

        // Act
        let result = ageCalculator.GetBirthdayWeek(dob);

        // Assert
        expect(result).toBe(expected);
    });

    each([[new Date(1987, 7, 8), '2021-08-02'],
    [new Date(1987, 7, 11), '2021-08-05'],
    [new Date(1987, 3, 11), '2021-04-05']
    ])
        .it('GivenBirthdayIsBetweenSundayAndWednesday_ShouldReturnTheDate6DaysBefore', (dob, expected) => {
            // Arrange
            let ageCalculator = CreateAgeCalculator();

            // Act
            let result = ageCalculator.GetBirthdayWeek(dob);

            // Assert
            expect(result).toBe(expected);
        });
});


function CreateAgeCalculator() {
    return new AgeCalculator();
}

