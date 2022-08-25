import axios from 'axios';
import SERVER_URL from './server';
import { FirstPartyAnswers } from '../type';

export const getMintInfo = (collecttionId: string) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/mint/${collecttionId}/info`;
        // console.log('reqUrl:', reqUrl);

        axios
            .get(reqUrl)
            .then((response) => {
                // console.log('getMintInfo response:', response.data);
                resolve(response.data);
            })
            .catch((error) => {
                // console.log('getMintInfo error:', error);
                reject(error);
            });
    });

export const answerMintQuestions = (
    collecttionId: string,
    wallet: string,
    answers: FirstPartyAnswers[],
) =>
    new Promise((resolve: (value: any) => void, reject: (value: string) => void) => {
        let reqUrl = `${SERVER_URL}/mint/${collecttionId}/answers`;
        // console.log('reqUrl:', reqUrl);

        const body: any = {};
        body['wallet_address'] = wallet;
        body['answers'] = answers;

        axios
            .post(reqUrl, body)
            .then((response) => {
                // console.log('answerMintQuestions response:', response);
                resolve(response.data);
            })
            .catch((error) => {
                // console.log('answerMintQuestions error:', error);
                reject(error);
            });
    });
