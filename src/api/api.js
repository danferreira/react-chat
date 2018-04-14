export default class API {
    static loadContacts(callback) {

        setTimeout(() => {
            var data = [{
                id: 1,
                name: "Contact #1",
                image: "/images/User-2.jpg",
                messages: [{
                    type: 'in',
                    text: 'Hello',
                    date: "02:00"
                },{
                    type: 'in',
                    text: 'Darkness my old friend',
                    date: "02:00"
                },
                {
                    type: 'out',
                    text: 'Ok',
                    date: "02:00"
                }]
            },
            {
                id: 2,
                name: "Contact #2",
                image: "/images/User-1.jpg",
                messages: [{
                    type: 'out',
                    text: 'Hello',
                    date: "02:00"
                },{
                    type: 'in',
                    text: 'Lorem ipsum himenaeos etiam ullamcorper erat mattis felis, quam aliquet torquent est elit vulputate interdum ipsum, elit nam arcu risus sollicitudin erat. aliquam fames urna blandit ad faucibus fermentum netus lacinia, mauris rutrum ornare accumsan gravida placerat conubia class, vitae molestie integer aliquam rutrum in mollis. viverra mi a ac fames curabitur augue magna, dictumst lorem ut pellentesque lacus gravida amet nam, sed nisi mauris massa varius fringilla. ultrices magna massa per vehicula mattis duis curae eleifend rhoncus, nec id elementum dui venenatis eleifend ac aliquet class ultricies, velit aliquet molestie netus posuere porta pulvinar donec. ',
                    date: "02:00"
                },
                {
                    type: 'out',
                    text: 'Ok',
                    date: "02:00"
                }]
            }];

            callback(data);
            return data;
        }, 2000);
    }
}
