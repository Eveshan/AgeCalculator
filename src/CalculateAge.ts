export class AgeCalculator {
    
    CalculateAge(dob: Date, target: Date) {
        if (target < dob)
            throw new Error("Date of birth is after target date!");

        let dateDifference = target.getTime() - dob.getTime();
        let diffDate = new Date(dateDifference);

        return Math.abs(diffDate.getUTCFullYear() - 1970);
    }


    GetBirthdayWeek(dob: Date) {
        let birthday = this.getBirthDayThisYear(dob);
        
        if(this.isBirthdayBetweenThursdayAndSaturday(birthday)){
            let birthdayWeek = this.getFirstDayOfWeek(birthday);
            
            return this.formatDate(birthdayWeek);
        }
        else{            
            let birthdayWeek = this.getDate6DaysAgo(birthday);
            return this.formatDate(birthdayWeek);
        }
            
    }

    private getDate6DaysAgo(birthday: Date) {
        let birthdayWeek = new Date(birthday);
        birthdayWeek.setDate(birthday.getDate() - 6);
        return birthdayWeek;
    }

    private formatDate(bdaywk: Date) {
        return bdaywk.toISOString().split('T')[0];
    }

    private getBirthDayThisYear(dob: Date) {
        let birthday = new Date(Date.now());
        birthday.setMonth(dob.getMonth());
        birthday.setDate(dob.getDate());
        return birthday;
    }

    private isBirthdayBetweenThursdayAndSaturday(birthday : Date)
    {
        if(birthday.getDay() >= 4) return true;
        return false;
    }

    private getFirstDayOfWeek(dayInWeek : Date)
    {
        let firstDayOfWeek = new Date(dayInWeek).setDate(dayInWeek.getUTCDate() - dayInWeek.getDay());
        let firstDayOfWeekDate = new Date(firstDayOfWeek);
        return firstDayOfWeekDate
    }

   
}