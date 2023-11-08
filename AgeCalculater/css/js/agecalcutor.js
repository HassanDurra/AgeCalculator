$(document).ready(function(){
   let dateOfBirthInput = $('input[name="date_of_birth"]');
   let selectionType    = $('select[name="type"]');
   let ageContainer     = $('#ageInput');
   let ageInput         = $('input[name="age"]');
   let submitButton     = $("#submitButton");

    $(submitButton).on('click' , function(e){
        e.preventDefault();
        isValid = true ;
        if(selectionType.val() == "")
        {
            e.preventDefault();
            toastr["error"]("Please Select Result Type");
            isValid = false;
            ageContainer.fadeOut();
            ageInput.val("");
        } 
        if(dateOfBirthInput.val() == "")
        {
            e.preventDefault();
            toastr["error"]("Please Select Date of Birth");
            isValid = false;
            ageContainer.fadeOut();

        } 
        if(isValid){
            if(selectionType.val() == "year")
            {
                console.log("Year only");
                var age = year_calculate(dateOfBirthInput.val()) ;
                if(age == "months" )
                {
                    age = months_calculate(dateOfBirthInput.val());
                    ageInput.val(age);
                    ageContainer.show();                    
                    if(age == "error"){
                        e.preventDefault();
                        ageContainer.fadeOut();
                        toastr["error"]("Date Of Birth And Current Date cannot be same");
                        return false;
                    }
                }
                else
                {
                    ageContainer.show();
                    ageInput.val(age);
                }
            }
            else if(selectionType.val() == "month")
            {
                var months = months_calculate(dateOfBirthInput.val());
                if(months == "error"){
                    e.preventDefault();
                    toastr["error"]("Date Of Birth And Current Date cannot be same");
                    return false;
                }
                ageContainer.show();
                ageInput.val(months);
            }
            else{
                ageContainer.show();
                ageInput.val("1 Years and 1 Month");
            }
        }
    })

    function year_calculate(birthDate){
        var dateOfBirth  = new Date(birthDate);
        var currentdate  = new Date();
        var years        = currentdate.getFullYear() - dateOfBirth.getFullYear();
        var months       = (dateOfBirth.getMonth() - currentdate.getMonth() + 12) % 12 ;
        if(currentdate.getFullYear() != dateOfBirth.getFullYear()){
            return years + " " + "Years";
        }
        else{
            return "months";
        }
    };
    function months_calculate(birthDate){
        var dateOfBirth  = new Date(birthDate);
        var currentdate  = new Date();
        var yearsDiff    = currentdate.getFullYear() - dateOfBirth.getFullYear();
        var monthsDiff   = currentdate.getMonth() - dateOfBirth.getMonth();
        
        if (currentdate.getDate() < dateOfBirth.getDate()) {
            yearsDiff -= 1;
            monthsDiff += 12;
        }
        
        var totalMonths = yearsDiff * 12 + monthsDiff;
        if( currentdate.getMonth() === dateOfBirth.getMonth() && currentdate.getFullYear() == dateOfBirth.getFullYear() && currentdate.getDate() == dateOfBirth.getDate()){
            return "error";
        }   
         
        return totalMonths + " " + "Months";
    }




   
})