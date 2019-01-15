interface IMenuItem {
  title: string;
  state: string;
  additionStates?: Array<string>;
  isActive?: boolean;
  links?: Array<any>;
}

export default {
  home: {
    title: 'home',
    state: 'app.home',
    //additionStates: ['app.home'],

  },
  profile: {
    title: 'profile',
    state: 'app.profile',
    //additionStates: ['app.profile'],
  },
} as { [id: string]: IMenuItem };
