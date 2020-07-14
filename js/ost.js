const small_size = 200;
const medium_size = 150;
const large_size = 100;
const xl_size = 50;

var utilization = 80;
var apps = 0;
var totalMemoryUtilization = 0;
var hostCores = 8;
var hostRam = 64;
var clusterName = 'DEVELOPMENT';

function truncateWithPrecision(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function resetVariables() {
    $("#check_ht").prop("checked", false);
    $('#input_pods_small').val('');
    $('#input_pods_medium').val('');
    $('#input_pods_large').val('');
    $('#input_pods_xl').val('');
    utilization = 80;
    $('#input_nodeutil').val('');
    apps = 0;
    totalMemoryUtilization = 0;
    hostCores = 8;
    $('#input_corenmb').val('');
    hostRam = 64;
    $('#input_ram').val('');
    clusterName = 'DEVELOPMENT';
    $('#input_clusterName').val('');
};

function calculateStepFourAndShow() {
    var inpt = 0;
    var mem = 0;
    apps = 0;
    totalMemoryUtilization = 0;
    inpt = parseInt($('#input_pods_small').val());
    if(inpt > 0){
        mem = inpt * 0.5;
    } else {
        inpt = small_size;
        mem = small_size * 0.5;
    }
    apps = apps + inpt;
    totalMemoryUtilization = totalMemoryUtilization + mem;
    $('#mem_ft_prnt_sm_num').html(inpt);
    $('#mem_ft_prnt_sm_mem').html(mem);

    inpt = parseInt($('#input_pods_medium').val());
    if(inpt > 0){
        mem = inpt;
    } else {
        inpt = medium_size;
        mem = medium_size;
    }
    apps = apps + inpt;
    totalMemoryUtilization = totalMemoryUtilization + mem;
    $('#mem_ft_prnt_m_num').html(inpt);
    $('#mem_ft_prnt_m_mem').html(mem);

    inpt = parseInt($('#input_pods_large').val());
    if(inpt > 0){
        mem = inpt * 2;
    } else {
        inpt = large_size;
        mem = large_size * 2;
    }
    apps = apps + inpt;
    totalMemoryUtilization = totalMemoryUtilization + mem;
    $('#mem_ft_prnt_l_num').html(inpt);
    $('#mem_ft_prnt_l_mem').html(mem);

    inpt = parseInt($('#input_pods_xl').val());
    if(inpt > 0){
        mem = inpt * 4;
    } else {
        inpt = xl_size;
        mem = xl_size * 4;
    }
    apps = apps + inpt;
    totalMemoryUtilization = totalMemoryUtilization + mem;
    $('#mem_ft_prnt_xl_num').html(inpt);
    $('#mem_ft_prnt_xl_mem').html(mem);

    $('#mem_ft_prnt_tot_num').html(apps);
    $('#mem_ft_prnt_tot_mem').html(totalMemoryUtilization);

    $('#step_4').show();
};

function calculateAndShow() {
    if($('#input_clusterName').val().length > 0){
        clusterName = $('#input_clusterName').val();
    }

    var inpt = 0;

    inpt = parseInt($('#input_corenmb').val());
    if(inpt > 0){
        hostCores = inpt;
    }

    inpt = parseInt($('#input_ram').val());
    if(inpt > 0){
        hostRam = inpt;
    }

    inpt = parseInt($('#input_nodeutil').val());
    if(inpt > 0){
        utilization = $('#input_nodeutil').val();
    }

    var effectiveMemoryCapacity = hostRam * (utilization / 100);

    var numberOfNodes = Math.ceil(totalMemoryUtilization / effectiveMemoryCapacity);
    var totalRequiredCores = numberOfNodes * hostCores;
    var totalVcpus = totalRequiredCores;
    if($('#check_ht').is(':checked')){
        totalRequiredCores = totalRequiredCores / 2;
        console.log("======> HT enabled.");
    }

    var subs = totalRequiredCores / 2;

    $('#tbl_title').html('Cluster: ' + clusterName);
    $('#appInstances').html(apps);
    $('#totmem').html( truncateWithPrecision(effectiveMemoryCapacity, 2));
    $('#nodenumb').html(numberOfNodes);
    $('#totcores').html(totalRequiredCores);
    $('#vcpus').html(totalVcpus);
    $('#subs').html(subs);
    
    $('#step_5').show();
};
 