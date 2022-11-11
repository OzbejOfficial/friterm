import React from 'react';
import * as bin from './bin';
import * as senpai from './bin/senpaihang';

var mode = 'normal';
var state = 'begin';
var count = 0;

export const shell = async (
  command: string,
  setHistory: (value: string) => void,
  clearHistory: () => void,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  const args = command.split(' ');
  args[0] = args[0].toLowerCase();

  if (mode == 'hang'){
    if (args[0] == 'exit'){
      mode = 'normal';
      setHistory('You hung ' + count + ' senpais.\nGoodbye!');
    }  else if (state == 'midgame') {
      var output = '';
      if(args[0].length > 1) { 
        output = `You can only guess one letter at a time or exit by typing 'exit'.`;
      } else {
        output = await senpai['newletter'](args);
      }     
      output += '\n' + await senpai['status'](args.slice(1));
      if(output.substring(10, 13) == 'won'){
        count++;
        state = 'begin';
        output += '\nYou have hung a senpai! Type "start" to hang another senpai.';
      } else if (output.substring(10, 13) == 'ran') {
        state = 'begin';
        output += '\nUnlucky! Type "start" to tighten that rope on another senpai.';
      }
      setHistory(output);
    } else if (Object.keys(senpai).indexOf(args[0]) === -1) {
      setHistory('You are in a hang mode. Type "exit" to exit.');
    } else if (args[0] == 'start') {
      state = 'midgame';
      var output = await senpai[args[0]](args.slice(1)) + '\n' + await senpai['status'](args.slice(1));
      setHistory(output);
    } else {
      var output = await senpai[args[0]](args.slice(1)) + '\n' + await senpai['status'](args.slice(1)); 
      setHistory(output);
    }
  } else if (args[0] === 'clear') {
    clearHistory();
  } else if(args[0] === 'senpaihang' || args[0] === 'sh') {
    setHistory('Welcome to the Senpai Hang!');
    mode = 'hang';
    setHistory('Type start to confirm you want to do this.')
  } else if (command === '') {
    setHistory('');
  } else if (Object.keys(bin).indexOf(args[0]) === -1) {
    setHistory(
      `shell: command not found: ${args[0]}. Try 'help' to get started.`,
    );
  } else {
    const output = await bin[args[0]](args.slice(1));
    setHistory(output);
  }

  setCommand('');
};
