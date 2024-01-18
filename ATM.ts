import inquirer from "inquirer";
const users = [
    { id: 'Ebad', pin: '1234', balance: 10000 },
    { id: 'Muneeb', pin: '5678', balance: 30000 }
];
async function main() {
    console.log('Welcome to the ATM console application!');
    const { userId, userPin } = await inquirer.prompt([
        {
            type: 'input',
            name: 'userId',
            message: 'Enter your user ID:'
        },
        {
            type: 'password',
            name: 'userPin',
            message: 'Enter your PIN:'
        }
    ]);
    const user = users.find(u => u.id === userId && u.pin === userPin);
    if (!user) {
        console.log('Invalid user ID or PIN. Exiting...');
        return;
    }
    console.log(`Welcome, ${userId}! Your current balance is $${user.balance}`);
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Select an action:',
            choices: ['Check Balance', 'Withdraw', 'Exit']
        }
    ]);
    if (action === 'Check Balance') {
        console.log(`Your current balance is $${user.balance}`);
    }
    else if (action === 'Withdraw') {
        const { amount } = await inquirer.prompt([
            {
                type: 'input',
                name: 'amount',
                message: 'Enter the amount to withdraw:'
            }
        ]);
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0 || parsedAmount > user.balance) {
            console.log('Invalid amount. Withdrawal failed.');
        }
        else {
            user.balance -= parsedAmount;
            console.log(`Withdrawal successful! Your new balance is $${user.balance}`);
        }
    }
    else {
        console.log('Exiting...');
        return;
    }
}
main();
export default { users, main };