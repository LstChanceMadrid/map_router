
   
   $(document).ready(function() {
        $("#btnSubmit").click(function(){
            // Your Twilio credentials
            let phone = document.getElementById('phoneNumber').value
            var SID = "ACcf293b6604134c4f632620905fd78270"
            var Key = "ec5666e87d5bbf9a8208faf815f0f0fd"

            $.ajax({
                type: 'POST',
                url: 'https://api.twilio.com/2010-04-01/Accounts/' + SID + '/Messages.json',
                data: {
                    "To" : phone,
                    "From" : "18325368356",
                    "Body" : res
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", "Basic " + btoa(SID + ':' + Key));
                },
                success: function(data) {
                    alert("Message sent");
                },
                error: function(data) {
                    alert("Invalid number try again");
                }
            });
            phone.value == ""
        });
        
    });
