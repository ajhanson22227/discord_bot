const Discord = require('discord.js');
module.exports = {

    name: 'roll',
    description: 'Rolls X dice, ',
    execute(client, message, args){
        number_of_dice = Number(args[0]);
        success_number = 8;
        repeat_number = 10;

        success_total = 0;
        failures_total = 0;
        bonus_rolls = 0;

        total_rolled = 0

        try{
            if (!isNaN(args[1])){
                success_number = Number(args[1]);
            }
            if (!isNaN(args[2])){
                repeat_number = Number(args[2]);
            }
        }catch(error){
            console.error(error)
            message.channel.send("Error, aborting")
            return
        }

        if (number_of_dice > 150){
            message.channel.send("Too many, I refuse to do")
            return
        }

        array_of_rolls = get_list(number_of_dice)
        success_total += get_success(array_of_rolls, success_number)
        failures_total += get_failures(array_of_rolls)
        bonus_rolls += get_bonus(array_of_rolls, repeat_number)

        array_of_bonus_rolls = []
        temp_bonus = bonus_rolls
        while (true){
            temp_array = get_list(temp_bonus)
            success_total += get_success(temp_array, success_number)

            temp_bonus = get_bonus(temp_array, repeat_number)
            if (temp_bonus == 0){
                array_of_bonus_rolls = merge(array_of_bonus_rolls, temp_array)
                break
            }
            array_of_bonus_rolls = merge(array_of_bonus_rolls, temp_array)
            bonus_rolls += temp_bonus
        }


        array_of_rolls = array_of_rolls.sort(sorter)
        array_of_bonus_rolls = array_of_bonus_rolls.sort(sorter)
        string_of_rolls = array_of_rolls.join(' | ')
        string_of_bonus_rolls = array_of_bonus_rolls.join(' | ')

        const rollEmbed =  new Discord.RichEmbed();
            rollEmbed.setTitle('Roll Result')
            if (success_total > failures_total){
                rollEmbed.setColor('#00FF00')
                rollEmbed.setDescription('Success!')
            }else{
                rollEmbed.setColor('#ff0000')
                rollEmbed.setDescription('Failure!')
            }
            rollEmbed.addField(`${number_of_dice} Rolls`, string_of_rolls)
            if (bonus_rolls > 0){
                rollEmbed.addField(`${bonus_rolls} Bonus Rolls`, string_of_bonus_rolls)
            }
            rollEmbed.addField(`Successes:`,success_total)
            rollEmbed.addField(`Failures:`,failures_total)
        
        message.channel.send(rollEmbed)

    }
}

function get_roll(){
    return Math.floor(Math.random() * 10 + 1)
}

function get_list(dice_number){
    roll_array = []
    for (var i = 0; i < dice_number; i++){
        roll_array.push(get_roll())
    }
    return roll_array
}

function get_success(roll_array, success_number){
    length = roll_array.length
    success_total = 0
    for (var i = 0; i < length; i++){
        if (roll_array[i] >= success_number){
            success_total += 1
        }
    }
    return success_total
}

function get_failures(roll_array){
    length = roll_array.length
    failure_total = 0
    for (var i = 0; i < length; i++){
        if (roll_array[i] == 1){
            failure_total += 1
        }
    }
    return failure_total
}

function get_bonus(roll_array, bonus_number){
    length = roll_array.length
    bonus_total = 0
    for (var i = 0; i < length; i++){
        if (roll_array[i] >= repeat_number){
            bonus_total += 1
        }
    }
    return bonus_total
}


//Pulled this sorter straight outta SO
function sorter(a, b) {
    if (a < b) return -1;  // any negative number works
    if (a > b) return 1;   // any positive number works
    return 0; // equal values MUST yield zero
  }



function merge(array1, array2){
    while (array2.length){
        array1.push(array2.shift())
    }
    return array1
}