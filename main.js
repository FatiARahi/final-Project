var quizTitle = "Computer Quiz";
    
    var quizQuestions = [
        {
            "question"      :   "Software that helps monitors and control computer system in a data centre. The best fit will be",
           
            "choices"       :   [
                                "System performance monitor",
                                "Telecommunication network management",
                                "Out sourcing is operations",
                                "Technology management",
            ],   
            "correct"       : "System performance monitor",
    
        },

        {
            "question"      :   "Information technology affect the people, tasks, technology, culture, and structure of organizations",
           
            "choices"       :   [
                                    "Impact of IT on management",
                                    "Impact of IT on organization",
                                    "Information system",
                                    "Operations and management"
                                    
                                ],
            "correct"       :   "HTML",
           
        },
        {
            "question"      :   "Which of the following is not an ITES of data management category? ",
           
            "choices"       :   [
                                    "Data Entry",
                                    "Custom reports",
                                    "Character Recognition and processing",
                                    "Transcription"
                                ],
            "correct"       :   "Transcription",
            
        },

        {
            "question"      :   "Auxillary memory is",
           
            "choices"       :   [
                                    "cache memory",
                                    "secondary memory",
                                    "extended memory",
                                    " memory slot"    
                                ],
            "correct"       :   "secondary memory",
         
        },

        {
            "question"      :   "How many units in a single bus structure communicate at a time?",
           
            "choices"       :   [
                                    "one",
                                    "two",
                                    "three",
                                    "four"
                                ],
            "correct"       :   "two",
        
        },

       

        {
            "question"      :   "Which of the following is the fastest?",
           
            "choices"       :   [
                                    "sensors, mechanical controllers",
                                    "video terminal",
                                    "magnetic tapes and disks",
                                    "central processing unit"
                                ],
            "correct"       :   "central processing unit",
          
        },

        {
            "question"      :   "Microprocessor can be used to make",
          
            "choices"       :   [
                                    "calculators",
                                    "computers",
                                    "digital systems",
                                    "all of these"
                                ],
            "correct"       :   "all of these",
          
        },

        {
            "question"      :   "A collection of wires that connects several devices is called",
            
            "choices"       :   [
                                    "bus",
                                    "bidirectional wires",
                                    "cables",
                                    "link"
                                ],
            "correct"       :   "bus",
         
        },

        {
            "question"      :   "A single bus structure is primarily found in",
            
            "choices"       :   [
                                    "mini and micro computers",
                                    "high performance machines",
                                    "main frames",
                                    "super computers"
                                ],
            "correct"       :   "mini and micro computers",
          
        },

        {
            "question"      :   "The ALU of computer normally contains a number of high speed storage elements is called",
           
            "choices"       :   [
                                    "magnetic disk",
                                    "hard disk",
                                    "registers",
                                    "semiconductor memory"
                                ],
            "correct"       :   "registers",
           
        },

        
                        
    ];
   

    var currentQuestion = 0;
    var score = 0;
    var submt = true;
    var picked;
    
    jQuery(document).ready(function($){
    
        function htmlEncode(value){
            return $(document.createElement('div')).text(value).html();
        }
    
        function addChoices(choices){
            if(typeof choices !== "undefined" && $.type(choices) == "array"){
                $('#choice-block').empty();
                for(var i=0;i<choices.length; i++){
                    $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');                    
                }
            }
        }
    
        function nextQuestion(){
            submt = true;
            $('#question').text(quizQuestions[currentQuestion]['question']);
            $('#pager').text('Question ' + Number(currentQuestion + 1) + ' of ' + quizQuestions.length);
            addChoices(quizQuestions[currentQuestion]['choices']);
            setupButtons();
        }
    
        function processQuestion(choice){
            if(quizQuestions[currentQuestion]['choices'][choice] == quizQuestions[currentQuestion]['correct']){
                $('.choice').eq(choice).css({'background-color':'#50D943'});
                score++;
            } else {
                $('.choice').eq(choice).css({'background-color':'#D92623'});
            }
            currentQuestion++;
            $('#submitbutton').html('NEXT QUESTION &raquo;').on('click', function(){
                if(currentQuestion == quizQuestions.length){
                    endQuiz();
                } else {
                    $(this).text('Check Answer').css({'color':'#222'}).off('click');
                    nextQuestion();
                }
            });
        }
    
        function setupButtons() {
            $('.choice').on('click', function() {
                picked = $(this).attr('data-index');
                $('.choice').removeClass('clicked'); // Remove clicked class from all choices
                $(this).addClass('clicked'); // Add clicked class to the selected choice
                if (submt) {
                    submt = false;
                    $('#submitbutton').css({
                        'color': 'white'
                    }).on('click', function() {
                        $('.choice').off('click');
                        $(this).off('click');
                        processQuestion(picked);
                    });
                }
            });
        }
    
        function endQuiz(){
            $('#question').empty();
    
            if (score >= 10){
                $('#choice-block').html('<center>Excellent</center>');
            }
            if (score >= 8 && score < 10){
                $('#choice-block').html('<center>Good</center>');
            }
            if (score >= 6 && score < 8){
                $('#choice-block').html('<center>Improve yourself</center>');
            }
            if (score < 5){
                $('#choice-block').html('<center>Very bad</center>');
            }
            
            $('#submitbutton').remove();
            $('#question').text("You got " + score + " out of " + quizQuestions.length + " correct.");
            $(document.createElement('h2')).css({'text-align':'center', 'font-size':'4em'}).text(Math.round(score/quizQuestions.length * 100) + '%').insertAfter('#question');
            $('#backBtn').show(); // Show the "Back to Main Page" button
        }
    
        function init(){
           
            if(typeof quizTitle !== "undefined" && $.type(quizTitle) === "string"){
                $(document.createElement('h1')).text(quizTitle).appendTo('#frame');
            } else {
                $(document.createElement('h1')).text("Quiz").appendTo('#frame');
            }
          
            if(typeof quizQuestions !== "undefined" && $.type(quizQuestions) === "array"){
               
                $(document.createElement('p')).addClass('pager').attr('id','pager').text('Question 1 of ' + quizQuestions.length).appendTo('#frame');
               
                $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quizQuestions[0]['question']).appendTo('#frame');
                
                if(quizQuestions[0].hasOwnProperty('image') && quizQuestions[0]['image'] != ""){
                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quizQuestions[0]['image']).attr('alt', htmlEncode(quizQuestions[0]['question'])).appendTo('#frame');
                }
                                
                $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');
            
                addChoices(quizQuestions[0]['choices']);
            
                $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Check Answer').css({'font-weight':700,'color':'#222','padding':'30px 0'}).appendTo('#frame');
            
                setupButtons();
            }
        }
        
        init();
        function processQuestion(choice) {
            const correctAnswerIndex = quizQuestions[currentQuestion]['choices'].indexOf(quizQuestions[currentQuestion]['correct']);
            const choices = document.querySelectorAll('.choice');
        
            if (choice == correctAnswerIndex) {
                choices[choice].style.backgroundColor = '#50D943'; // Green for correct answer
                score++;
            } else {
                choices[choice].style.backgroundColor = '#D92623'; // Red for wrong answer
                choices[correctAnswerIndex].style.backgroundColor = '#50D943'; // Highlight correct answer
            }
        
            currentQuestion++;
            $('#submitbutton').html('NEXT QUESTION &raquo;').on('click', function() {
                if (currentQuestion == quizQuestions.length) {
                    endQuiz();
                } else {
                    $(this).text('Check Answer').css({
                        'color': '#222'
                    }).off('click');
                    nextQuestion();
                }
            });
        }
    
        // Event handler for "Back to Main Page" button
        $('#backBtn').on('click', function() {
            window.location.href = "index.html"; // Replace "index.html" with your main page URL
        });
    });