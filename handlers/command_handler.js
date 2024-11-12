const fs = require('node:fs');
const path = require('node:path');

module.exports = (client) => {
    const foldersPath = path.join(__dirname, '..', 'commands');
    const commandFolders = fs.readdirSync(foldersPath);
    let comms = 0;
    let invalidcomms = [];

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                comms++;
            } else {
                invalidcomms.push(file);
            }
        }
    }

    client.Log(`${comms} ${comms == 1 ? 'command has' : 'commands have'} been loaded!`);
    if (invalidcomms.length > 0) client.Log(`[WARNING]: ${invalidcomms.length} ${invalidcomms.length == 1? 'file' : 'files'} skipped: ${invalidcomms.join(', ')}\n${invalidcomms.length == 1? 'It is' : 'They are'} missing a required "data" or "execute" property.`);
}