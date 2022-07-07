import axios from 'axios';
import SERVER_URL from './server';
// import { FirstPartyAnswers } from '../type';

export const getMintInfo = (collecttionId: string, username: string, password: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/mint/${collecttionId}/info`;
        // console.log('reqUrl:', reqUrl);

        const config = {
            auth: {
                username: username,
                password: password,
            },
        };

        axios
            .get(reqUrl, config)
            .then((response) => {
                // console.log('getMintInfo response:', response.data);
                resolve(response.data);
            })
            .catch((error) => {
                // console.log('getMintInfo error:', error);
                reject(error);
            });
    });

// export const answerMintQuestions = (
//     collecttionId: string,
//     wallet: string,
//     answers: FirstPartyAnswers[],
//     token: string
// ) =>
//     new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
//         let reqUrl = `${SERVER_URL}/mint/${collecttionId}/answers`;
//         // console.log('reqUrl:', reqUrl);

//         const body: any = {};
//         body['wallet_address'] = wallet;
//         body['answers'] = JSON.stringify(answers);

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-auth-token': token,
//             },
//         };

//         axios
//             .post(reqUrl, body, config)
//             .then((response) => {
//                 // console.log('addOrg response:', response);
//                 if (response.data.code === 200) resolve(response.data.data);
//                 else resolve('');
//             })
//             .catch((error) => {
//                 // console.log('addOrg error:', error);
//                 reject(error.response.data);
//             });
//     });
