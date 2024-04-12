$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

function calculateTax() {
    let grossIncome = parseFloat($('#grossIncome').val());
    let extraIncome = parseFloat($('#extraIncome').val());
    let deductions = parseFloat($('#deductions').val());
    let ageGroup = $('#age').val();

    let totalIncome = grossIncome + extraIncome - deductions;
    let taxRate = 0;
    let taxDue = 0;

    if (totalIncome > 800000) {
        switch(ageGroup) {
            case 'under40':
                taxRate = 0.30;
                break;
            case 'between40and60':
                taxRate = 0.40;
                break;
            case '60plus':
                taxRate = 0.10;
                break;
            default:
                $('#age').addClass('invalid');
                $('.error-icon').show();
                return;
        }
        taxDue = taxRate * (totalIncome - 800000);
    }

    $('#taxResult').text(`Total Tax Due: ₹${taxDue.toLocaleString()}`);
    $('#resultModal').modal('show');
}

$('input, select').on('change', function () {
    $(this).removeClass('invalid');
    $('.error-icon').hide();
});

$('input[type="number"]').on('input', function () {
    if (isNaN(parseFloat($(this).val()))) {
        $(this).addClass('invalid');
        $(this).next('.error-icon').show();
    } else {
        $(this).removeClass('invalid');
        $(this).next('.error-icon').hide();
    }
});
