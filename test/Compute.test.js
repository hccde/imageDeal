import chai from 'chai';
import Compute from '../class/Compute';
let expect = chai.expect;

describe('test for Compute class',function(){
	let instance = new Compute([
				[1,2,3],
				[3,4,5],
				[6,7,8]]);

	it('instance',function(){
		expect(instance).to.be.an.instanceof(Compute)
	});
	it('#_moveTmpl',function(){
		console.log(instance.moveTmpl([[0,0],[0,0]],function(tmpl,area){
			let tmpl_height = tmpl.length,
			tmpl_width = tmpl[0].length,
			t = -1;

			for(let i = 0;i<tmpl_height;i++){
				for(let j = 0;j<tmpl_width;j++){
					t = tmpl[i][j]*area[i][j];
				}
			}
			return t;
		}))
		// expect().to.be.equal(0)
	})
})
