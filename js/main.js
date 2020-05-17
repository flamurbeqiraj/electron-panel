const elLoader  =  document.querySelector('.page--loader');
const elPanel   =  document.querySelector('.page--main');
const clickBTN = new Audio('./mp3/click-btn.mp3');
const backBTN  = new Audio('./mp3/back-btn.mp3');
require('dotenv').config()

var elCurrent	= '';
var getWidth    = parseFloat($("#logoText").width()) + 2;
$("#logoText").css({"width": "0px", "display": "block"});
setTimeout(function() {
    $("#logoText").animate({width: getWidth}, 150 );
}, 1500);
setTimeout(function() {
    elLoader.classList.add('animated', 'bounceOut', 'faster');
    elLoader.addEventListener('animationend', function() {
		this.classList.remove('animated', 'bounceOut', 'faster');
        this.style.display = 'none';
        elPanel.style.display = 'flex';
		elPanel.classList.add('animated', 'bounceIn', "faster");
		elPanel.addEventListener('animationend', function() {
			this.classList.remove('animated', 'bounceIn', "faster");
		});
    });
}, 4000);

$(document).on("click", ".mainCube", function() {
	clickBTN.play();
	var thePage		= $(this).data("page");
	elCurrent	= $('.page--'+thePage);
	$(".page--main").fadeOut(100, function() {
		elCurrent.fadeIn(100);
	});

	console.log(process.env.REMOTE_HOST);
	if (thePage == 'pyetsoret') {
		var connection = mysql.createConnection({
            host: process.env.REMOTE_HOST,
            user: process.env.REMOTE_USER,
            password: process.env.REMOTE_PASS,
            database: process.env.REMOTE_DB
        });
        connection.connect((err) => {
            if(err) {
                return console.log(err.stack);
            }
            // console.log("Connection successfuly established");
        });
        connection.query('SELECT p.*, a.emri, (SELECT count(id) FROM `data_aa_pyetjet` WHERE id_pyetsori=p.id) AS pnr FROM `data_aa_pyetsori` p INNER JOIN `data_aa_admin` a ON a.id=p.id_adm_created', (err, rows, fields) => {
			$("#pyetsoriTable > tbody").empty().html('<tr><td colspan="8" style="text-align: center;"><i class="fas fa-database"></i> Në pritje të përgjigjes nga databaza...</td></tr>');
            if (err) {
                return console.log("An error ocurred with the query", err);
				$("#pyetsoriTable > tbody").empty().html('<tr><td colspan="8" style="text-align: center;"><i class="fas fa-exclamation-circle"></i> Lidhja u refuzua, një raport është dërguar tek zhvilluesi.</td></tr>');
            } else {
				$("#pyetsoriTable > tbody").empty();
				// console.log(rows);
				$.each(rows, function(k, v) {
					var themonth = v.data_create.getUTCMonth() + 1; //months from 1-12
					var theday = v.data_create.getUTCDate();
					var theyear = v.data_create.getUTCFullYear();
					var thehours = v.data_create.getHours();
					var theminutes= v.data_create.getMinutes();
					var thenewdate = theday+"."+themonth+"."+theyear+" "+thehours+":"+theminutes;

					var doStatus = '';
					switch (v.status) {
						case 1:
							doStatus = '<span class="infoPezull">PEZULL</span>';
							break;
						case 2:
							doStatus = '<span class="infoFshire">FSHIRË</span>';
							break;
						case 3:
							doStatus = '<span class="infoAprovuar">APROVUAR</span>';
							break;
						default:
						  doStatus = '<span class="infoFshire">GABIM</span>';
					}

					$("#pyetsoriTable > tbody").append('<tr><td>#'+v.id+'</td><td>'+v.titulli+'</td><td>'+v.pershkrimi+'</td><td>'+v.pnr+'</td><td>'+v.emri+'</td><td>'+doStatus+'</td><td>'+thenewdate+'</td><td><div class="btn-group" role="group" aria-label="Basic example"><button type="button" class="btn btn-primary btn-extra-small editPyetsori"><i class="fas fa-pen"></i></button><button type="button" data-id="'+v.id+'" class="btn btn-danger btn-extra-small removePyetsor"><i class="fas fa-trash"></i></button></div></td></tr>');
				});
			}
        });
        connection.end(() => {
            // console.log("Connection successfuly closed");
        });
	}
});
$(document).on("click", ".backBtn", function() {
	backBTN.play();
	elCurrent.fadeOut(100, function() {
		$(".page--main").fadeIn(100);
	});
});

$(document).on("click", ".removePyetsor", function() {
	var element= $(this);
	var mainid = $(this).data('id');

	Swal.fire({
		title: 'Aprovim',
		html: "Konfirmoni fshirjen e pyetsorit <b>#"+mainid+"</b> me 'PO'!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'PO',
		cancelButtonText: 'ANULO'
	}).then((result) => {
		if (result.value) {
			element.closest('tr').remove();
			Swal.fire({
				title: 'Aprovuar',
				html: "Pyetsori është fshirë me sukses.",
				icon: 'success',
				confirmButtonText: 'Në rregull',
				timer: 1500
			});
		}
	});
});

$(document).on("click", ".editPyetsori", function() {
	var mainid = $(this).data('id');
	$(".page--allDialogs").fadeIn().promise().done(function() {
		
	});
});