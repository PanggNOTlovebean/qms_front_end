import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Entryer from './views/Entryer.vue';
import Newquestion from './components/Newquestion/Newquestion.vue';
import Newpaper from './components/Newpaper/Newpaper.vue';
import Singlechoose from './components/Singlechoose/Singlechoose.vue';
import Multiplechoose from './components/Multiplechoose/Multiplechoose.vue';
import Judge from './components/Judge/Judge.vue';
import Blank from './components/Blank/Blank.vue';
import Discuss from './components/Discuss/Discuss.vue';
import SinChoose from './components/Newpaper/SinChoose.vue';
import MulChoose from './components/Newpaper/MulChoose.vue';
import Bla from './components/Newpaper/Bla.vue';
import Jun from './components/Newpaper/Jun.vue';
import Dis from './components/Newpaper/Dis.vue';
import Manager from './views/Manager.vue';
import QuestionManager from './components/QuestionManager/QuestionManager.vue';
import SchoolManager from './components/SchoolManager/SchoolManager.vue';
import PaperManager from './components/PaperManager/PaperManager.vue';
import MakePaperAuto from './components/MakePaper/MakePaperAuto.vue';
import Paper from './components/Paper/Paper.vue';
import MakePaperByHand from './components/MakePaper/MakePaperByHand.vue'
import AddQuestion from './components/MakePaper/AddQuestion.vue'
Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'login',
			component: Login
		},

		{
			path: '/Entryer',
			name: 'Entryer',
			component: Entryer,
			children: [
				{
					path: 'Newquestion',
					name: 'Newquestion',
					component: Newquestion
				},
				{
					path: 'Newpaper',
					name: 'Newpaper',
					component: Newpaper,
					children: []
				},
				{
					path: 'Singlechoose/:id',
					name: 'Singlechoose',
					component: Singlechoose
				},
				{
					path: 'Multiplechoose/:id',
					name: 'Multiplechoose',
					component: Multiplechoose
				},
				{
					path: 'Judge/:id',
					name: 'Judge',
					component: Judge
				},
				{
					path: 'Blank/:id',
					name: 'Blank',
					component: Blank
				},
				{
					path: 'Discuss/:id',
					name: 'Discuss',
					component: Discuss
				},
				{
					path: 'Singlechooseforpaper/:id',
					name: 'SinChoose',
					component: SinChoose
				},
				{
					path: 'Multiplechooseforpaper/:id',
					name: 'MulChoose',
					component: MulChoose
				},
				{
					path: 'Judgeforpaper/:id',
					name: 'Jun',
					component: Jun
				},
				{
					path: 'Blankforpaper/:id',
					name: 'Bla',
					component: Bla
				},
				{
					path: 'Discussforpaper/:id',
					name: 'Dis',
					component: Dis
				}
			]
		},
		{
			path: '/Manager',
			name: 'manager',
			component: Manager,
			children: [
				{ path: 'QuestionManager', name: 'QuestionManager', component: QuestionManager },
				{ path: 'SchoolManager', name: 'SchoolManager', component: SchoolManager },
				{ path: 'PaperManager', name: 'PaperManager', component: PaperManager },
				{ path: 'MakePaperAuto', name: 'MakePaperAuto', component: MakePaperAuto },
        { path: 'Paper', name: 'Paper', component: Paper },
				{ path: 'MakePaperByHand', name: 'MakePaperByHand', component: MakePaperByHand },
				{ path: 'AddQuestion', name: 'AddQuestion', component: AddQuestion },
			]
		}
	]
});
