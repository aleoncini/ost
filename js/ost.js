var utilization = 80;
var apps = 200;
var hostCores = 8;
var hostRam = 64;
var memFootprint = 2;
var clusterName = 'DEVELOPMENT';

function resetVariables() {
    utilization = 80;
    apps = 200;
    hostCores = 8;
    hostRam = 64;
    memFootprint = 2;
    clusterName = 'DEVELOPMENT';
};

function calculateAndShow() {
    if($('#input_clusterName').val().length > 0){
        clusterName = $('#input_clusterName').val();
    }

    var inpt = 0;
    inpt = $('#input_corenmb').val();
    if(inpt > 0){
        hostCores = $('#input_corenmb').val();
        console.log("======> cores: " + hostCores);
    }

    inpt = $('#input_ram').val();
    if(inpt > 0){
        hostRam = $('#input_ram').val();
        console.log("======> ram: " + hostRam);
    }

    inpt = $('#input_nodeutil').val();
    if(inpt > 0){
        utilization = $('#input_nodeutil').val();
        console.log("======> util: " + utilization);
    }

    var effectiveMemoryCapacity = hostRam * (utilization / 100);

    inpt = $('#input_instnmb').val();
    if(inpt > 0){
        apps = $('#input_instnmb').val();
        console.log("======> apps: " + apps);
    }

    inpt = $('#input_memftp').val();
    if(inpt > 0){
        memFootprint = $('#input_memftp').val();
        console.log("======> mem: " + memFootprint);
    }

    var totalMemoryUtilization = apps * memFootprint;

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
    $('#totmem').html(effectiveMemoryCapacity);
    $('#nodenumb').html(numberOfNodes);
    $('#totcores').html(totalRequiredCores);
    $('#vcpus').html(totalVcpus);
    $('#subs').html(subs);
    
    $('#step_5').show();
};
 