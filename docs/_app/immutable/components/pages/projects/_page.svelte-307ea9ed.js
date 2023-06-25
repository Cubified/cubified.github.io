import{S as q,i as D,s as N,k as b,l as C,m as S,h as p,n as u,b as k,B,K as Y,o as X,q as O,a as M,r as $,c as x,L as V,G as m,M as U,J as G,w as _,I as H,x as W,y as j,f as R,t as I,z as E}from"../../../chunks/index-7c65267d.js";import{c as A}from"../../../chunks/shared-23917130.js";import{B as Q,a as Z}from"../../../chunks/background-534233c2.js";function tt(n,t){n.postMessage(JSON.stringify(t))}function et(n){return n.data?JSON.parse(n.data):{}}function it(n){return n&&n.id&&n.radius&&n.position&&typeof n.position.x=="number"&&typeof n.position.y=="number"}function nt(n){return n&&typeof n.width=="number"&&typeof n.height=="number"}class st{constructor(t={}){this.worker=new Worker(URL.createObjectURL(new Blob([`// most of this code is taken from here:
// https://github.com/snorpey/CirclePackingJS/blob/master/js-module/web/js/lib/Vector.js
// by @onedayitwillmake / Mario Gonzalez with some changes by @snorpey

class Vector {
	constructor ( x, y ) {
		if ( typeof x === 'object' ) {
			this.x = x.x;
			this.y = x.y;
		} else {
			this.x = x;
			this.y = y;
		}
	}

	cp () {
		return new Vector( this.x, this.y );
	}

	mul ( factor ) {
		this.x *= factor;
		this.y *= factor;
		return this;
	}

	normalize () {
		var l = this.length();
		this.x /= l;
		this.y /= l;
		return this;
	}

	length () {
		var length = Math.sqrt( this.x * this.x + this.y * this.y );
		
		if ( length < 0.005 && length > -0.005 ) {
			return 0.000001;
		}

		return length;
	}

	distance ( vec ) {
		var deltaX = this.x - vec.x;
		var deltaY = this.y - vec.y;
		return Math.sqrt( ( deltaX * deltaX ) + ( deltaY * deltaY ) );
	}

	distanceSquared ( vec ) {
		var deltaX = this.x - vec.x;
		var deltaY = this.y - vec.y;
		return ( deltaX * deltaX ) + ( deltaY * deltaY );
	}
}

// most of this code is taken from here:
// https://github.com/snorpey/CirclePackingJS/blob/master/js-module/web/js/PackedCircle.js
// by @onedayitwillmake / Mario Gonzalez with some changes by @snorpey

class PackedCircle {
	constructor ( { id, radius, x, y, isPulledToCenter, isPinned } ) {
		x = x || 0;
		y = y || 0;

		this.id = id;                      

		// Where we would like to be
		this.targetPosition = new Vector( 0, 0 );
		// Where we really are
		this.position = new Vector( x, y );
		this.previousPosition = new Vector( x, y );

		// For the div stuff  - to avoid superflous movement calls
	  	this.positionWithOffset = new Vector( x, y );
		this.previousPositionWithOffset = new Vector( x, y );

		this.isPulledToCenter = isPulledToCenter;
		this.isPinned = isPinned;

		// Stored because transform3D is relative
		this.setRadius( radius );
	}

	setPosition ( aPosition ) {
		this.previousPosition = this.position;
		this.position = aPosition.cp();
	}

	distanceSquaredFromTargetPosition () {
		var distanceSquared = this.position.distanceSquared( this.targetPosition );
		// if it's shorter than either radi, we intersect
		return distanceSquared < this.radiusSquared;
	}

	setRadius ( aRadius ) {
		this.radius = aRadius;
		this.radiusSquared = aRadius * aRadius;
		this.originalRadius = aRadius;
	}

	get delta () {
		return new Vector(
			this.position.x - this.previousPosition.x,
			this.position.y - this.previousPosition.y
		);
	}
}

// most of this code is taken from here:
// https://github.com/snorpey/CirclePackingJS/blob/master/js-module/web/js/PackedCircleManager.js
// by @onedayitwillmake / Mario Gonzalez with some changes by @snorpey

class PackedCircleManager {
	constructor () {
		this.allCircles = [ ];
		this.pinnedCircleIds = [ ];
		this.desiredTarget = new Vector( 0, 0 );
		this.bounds = { left: 0, top: 0, right: 0, bottom: 0 };
		this.damping = 0.025;

		// Number of passes for the centering and collision
		// algorithms - it's (O)logN^2 so use increase at your own risk!
		// Play with these numbers - see what works best for your project
		this.numberOfCenteringPasses = 1;
		this.numberOfCollisionPasses = 3;

		this.isCenterPullActive = true;
	}

	/**
	 * Set the boundary rectangle for the circle packing.
	 * This is used to locate the 'center'
	 * @param aBoundaryObject
	 */
	setBounds ( aBoundaryObject ) {
		if ( typeof aBoundaryObject.left === 'number' ) {
			this.bounds.left = aBoundaryObject.left;
		}

		if ( typeof aBoundaryObject.right === 'number' ) {
			this.bounds.right = aBoundaryObject.right;
		}

		if ( typeof aBoundaryObject.top === 'number' ) {
			this.bounds.top = aBoundaryObject.top;
		}

		if ( typeof aBoundaryObject.bottom === 'number' ) {
			this.bounds.bottom = aBoundaryObject.bottom;
		}

		if ( typeof aBoundaryObject.width === 'number' ) {
			this.bounds.right = this.bounds.left + aBoundaryObject.width;
		}

		if ( typeof aBoundaryObject.height === 'number' ) {
			this.bounds.bottom = this.bounds.top + aBoundaryObject.height;
		}
	}

	/**
	 * Add a circle
	 * @param aCircle A Circle to add, should already be created.
	 */
	addCircle ( aCircle ) {
		if ( ! ( aCircle instanceof PackedCircle ) ) {
			aCircle = new PackedCircle( {
				id: aCircle.id,
				radius: aCircle.radius,
				x: aCircle.position.x || 0,
				y: aCircle.position.y || 0,
				isPinned: aCircle.isPinned || false,
				isPulledToCenter: typeof aCircle.isPulledToCenter === 'boolean' ? aCircle.isPulledToCenter : true
			} );
		}

		this.allCircles.push( aCircle );
		aCircle.targetPosition = this.desiredTarget.cp();
	}

	/**
	 * Remove a circle
	 * @param circleToRemoveId Id of the circle to remove
	 */
	removeCircle ( circleToRemoveId ) {
		const indicesToRemove = this.allCircles.reduce( ( indices, circle, index ) => {
			if ( circle.id === circleToRemoveId ) {
				indices.push( index );
			}

			return indices;
		}, [ ] );

		for ( let n = indicesToRemove.length - 1; n >= 0; n-- ) {
			this.allCircles.splice( indicesToRemove[n], 1 );
		}
	}

	/**
	 * Recalculate all circle positions
	 */
	updatePositions () {
		var circleList = this.allCircles;
		var circleCount = circleList.length;

		// store information about the previous position
		for ( let i = 0; i < circleCount; ++i ) {
			const circle = circleList[i];

			circle.previousPosition = circle.position.cp();
		}

		if ( this.desiredTarget && this.isCenterPullActive ) {
			// Push all the circles to the target - in my case the center of the bounds
			this.pushAllCirclesTowardTarget( this.desiredTarget );
		}
		
		// Make the circles collide and adjust positions to move away from each other
		this.handleCollisions();

		// store information about the previous position
		for ( let i = 0; i < circleCount; ++i ) {
			const circle = circleList[i];

			this.handleBoundaryForCircle( circle );
		}
	}

	pushAllCirclesTowardTarget ( aTarget ) {
		var v = new Vector( 0, 0 );

		var dragCircle = this.draggedCircle;
		var circleList = this.allCircles;
		var circleCount = circleList.length;

		for ( var n = 0; n < this.numberOfCenteringPasses; n++ ) {			
			for ( var i = 0; i < circleCount; i++ ) {
				var circle = circleList[i];
				
				if ( circle.isPulledToCenter ) {
					// Kinematic circles can't be pushed around.
					const isCircleKinematic = circle === dragCircle || this.isCirclePinned( circle.id );

					if ( isCircleKinematic ) {
						continue;
					}

					v.x = circle.position.x - aTarget.x;
					v.y = circle.position.y - aTarget.y;
					v.mul ( this.damping );
					
					circle.position.x -= v.x;
					circle.position.y -= v.y;
				}
			}
		}
	}

	/**
	 * Packs the circles towards the center of the bounds.
	 * Each circle will have it's own 'targetPosition' later on
	 */
	handleCollisions () {
		var v = new Vector( 0, 0 );

		var dragCircle = this.draggedCircle;
		var circleList = this.allCircles;
		var circleCount = circleList.length;

		// Collide circles
		for ( var n = 0; n < this.numberOfCollisionPasses; n++ ) {
			for ( var i = 0; i < circleCount; i++ ) {
				var circleA = circleList[i];
				
				for ( var j = i + 1; j < circleCount; j++ ) {
					var circleB = circleList[j];

					const isCircleAPinned = this.isCirclePinned( circleA.id );
					const isCircleBPinned = this.isCirclePinned( circleB.id );

					// Kinematic circles can't be pushed around.
					const isCircleAKinematic = circleA === dragCircle || isCircleAPinned;
					const isCircleBKinematic = circleB === dragCircle || isCircleBPinned;
					
					if (
						// It's us!
						circleA === circleB ||

						// Kinematic circles don't interact with eachother
						( isCircleAKinematic && isCircleBKinematic )
					) {
						continue; 
					}

					var dx = circleB.position.x - circleA.position.x;
					var dy = circleB.position.y - circleA.position.y;

					// The distance between the two circles radii, 
					// but we're also gonna pad it a tiny bit 
					var r = ( circleA.radius + circleB.radius ) * 1.08;
					var d = circleA.position.distanceSquared( circleB.position );

					if ( d < ( r * r ) - 0.02 ) {
						v.x = dx;
						v.y = dy;
						v.normalize();

						var inverseForce = ( r - Math.sqrt( d ) ) * 0.5;
						v.mul( inverseForce );
						
						if ( ! isCircleBKinematic ) {
							if ( isCircleAKinematic ) {
								// Double inverse force to make up 
								// for the fact that the other object is fixed
								v.mul( 2.2 );
							}

							circleB.position.x += v.x;
							circleB.position.y += v.y;
						}

						if ( ! isCircleAKinematic ) {
							if ( isCircleBKinematic ) {
								// Double inverse force to make up 
								// for the fact that the other object is fixed
								v.mul( 2.2 );
							}

							circleA.position.x -= v.x;
							circleA.position.y -= v.y;
						}
					}
				}
			}
		}
	}

	handleBoundaryForCircle ( aCircle ) {		
		const x = aCircle.position.x;
		const y = aCircle.position.y;
		const radius = aCircle.radius;
		
		let overEdge = false;

		if ( x + radius >= this.bounds.right ) {
			aCircle.position.x = this.bounds.right - radius;
			overEdge = true;
		} else if ( x - radius < this.bounds.left ) {
			aCircle.position.x = this.bounds.left + radius;
			overEdge = true;
		}

		if ( y + radius > this.bounds.bottom ) {
			aCircle.position.y = this.bounds.bottom - radius;
			overEdge = true;
		} else if ( y - radius < this.bounds.top ) {
			aCircle.position.y = this.bounds.top + radius;
			overEdge = true;
		}

		// end dragging if user dragged over edge
		if ( overEdge && aCircle === this.draggedCircle ) {
			this.draggedCircle = null;
		}
	}

	/**
	 * Force a certain circle to be the 'draggedCircle'.
	 * Can be used to undrag a circle by calling setDraggedCircle(null)
	 * @param aCircle  Circle to start dragging. It's assumed to be part of our list. No checks in place currently.
	 */
	setDraggedCircle ( aCircle ) {
		// Setting to null, and we had a circle before.
		// Restore the radius of the circle as it was previously
		if ( this.draggedCircle && this.draggedCircle !== aCircle ) {
			this.draggedCircle.radius = this.draggedCircle.originalRadius;
		}

		this.draggedCircle = aCircle;
	}

	dragStart ( id ) {
		const draggedCircle = this.allCircles.filter( circle => circle.id === id )[0];
		this.setDraggedCircle( draggedCircle );
	}

	dragEnd ( id ) {
		if ( this.draggedCircle ) {
			this.setDraggedCircle( null );
		}
	}

	drag ( id, position ) {
		if ( this.draggedCircle && position ) {
			this.draggedCircle.position.x = position.x;
			this.draggedCircle.position.y = position.y;
		}
	}

	isCirclePinned ( id ) {
		const circle = this.circleById( id );

		if ( circle ) {
			return circle.isPinned;
		}

		return false;
	}

	pinCircle ( id ) {
		const circle = this.circleById( id );

		if ( circle ) {
			circle.isPinned = true;
		}
	}

	unpinCircle ( id ) {
		const circle = this.circleById( id );

		if ( circle ) {
			circle.isPinned = false;
		}
	}

	setCircleRadius ( id, radius ) {
		const circle = this.circleById( id );

		if ( circle ) {
			circle.setRadius( radius );
		}
	}

	setCircleCenterPull ( id, centerPull ) {
		const circle = this.circleById( id );

		if ( circle ) {
			circle.isPulledToCenter = centerPull;
		}
	}

	setCenterPull ( centerPull ) {
		this.isCenterPullActive = centerPull;
	}

	circleById ( id ) {
		return this.allCircles.filter( circle => circle.id === id )[0];
	}

	/**
	 * Sets the target position where the circles want to be
	 * @param aPosition
	 */
	setTarget ( aPosition ) {
		this.desiredTarget = aPosition;
	}
}

function sendWorkerMessage ( worker, msg ) {
	worker.postMessage( JSON.stringify( msg ) );
}

function processWorkerMessage ( event ) {
	return event.data ? JSON.parse( event.data ) : { };
}

// this code is mostly for message passing between the 
// PackedCircleManager and CirclePacker classes

self.addEventListener( 'message', receivedMessage );

const circleManager = new PackedCircleManager();

function receivedMessage ( event ) {
	const { type, message } = processWorkerMessage( event );

	if ( type === 'bounds' )  {
		circleManager.setBounds( message );
	}

	if ( type === 'target' )  {
		setTarget( message );
	}

	if ( type === 'addcircles' ) {
		addCircles( message );
	}

	if ( type === 'removecircle' ) {
		circleManager.removeCircle( message );
	}

	if ( type === 'update' ) {
		update();
	}

	if ( type === 'dragstart' ) {
		circleManager.dragStart( message.id, message.position );
	}

	if ( type === 'drag' ) {
		circleManager.drag( message.id, message.position );
	}

	if ( type === 'dragend' ) {
		circleManager.dragEnd( message.id );
	}

	if ( type === 'pincircle' ) {
		circleManager.pinCircle( message );
	}

	if ( type === 'unpincircle' ) {
		circleManager.unpinCircle( message );
	}

	if ( type === 'centeringpasses' ) {
		if ( typeof message === 'number' && message > 0 ) {
			circleManager.numberOfCenteringPasses = message;
		}
	}

	if ( type === 'collisionpasses' ) {
		if ( typeof message === 'number' && message > 0 ) {
			circleManager.numberOfCollisionPasses = message;
		}
	}

	if ( type === 'damping' ) {
		if ( typeof message === 'number' && message > 0 ) {
			circleManager.damping = message;
		}
	}

	if ( type === 'circleradius' ) {
		circleManager.setCircleRadius( message.id, message.radius );
	}

	if ( type === 'circlecenterpull' ) {
		circleManager.setCircleCenterPull( message.id, message.centerPull );
	}

	if ( type === 'centerpull' ) {
		circleManager.setCenterPull( message.centerPull );
	}
}

function updatePage ( type, message ) {
	sendWorkerMessage( self, { type, message } );
}

function addCircles ( circles ) {
	if ( Array.isArray( circles ) && circles.length ) {
		circles.forEach( circleManager.addCircle.bind( circleManager ) );
	}
}

function setTarget ( target ) {
	if ( target && typeof target.x === 'number' && typeof target.y === 'number' ) {
		circleManager.setTarget( new Vector( target ) );
	}
}

function update () {
	circleManager.updatePositions();

	sendPositions();
}

function sendPositions () {
	const positions = circleManager.allCircles.reduce( ( result, circle ) => {
		result[circle.id] = {
			position: circle.position,
			previousPosition: circle.previousPosition,
			radius: circle.radius,
			delta: circle.delta,
			isPulledToCenter: circle.isPulledToCenter,
			isPinned: circle.isPinned
		};

		return result;
	}, { } );

	updatePage( 'move', positions );
}
`],{type:"text/javascript"}))),this.worker.addEventListener("message",this.receivedWorkerMessage.bind(this)),this.isContinuousModeActive=typeof t.continuousMode=="boolean"?t.continuousMode:!0,this.onMoveStart=t.onMoveStart||null,this.onMove=t.onMove||null,this.onMoveEnd=t.onMoveEnd||null,this.lastCirclePositions=[],t.centeringPasses&&this.setCenteringPasses(t.centeringPasses),t.collisionPasses&&this.setCollisionPasses(t.collisionPasses),this.addCircles(t.circles||[]),this.setBounds(t.bounds||{width:100,height:100}),this.setTarget(t.target||{x:50,y:50}),this.isLooping=!1,this.areItemsMoving=!0,this.animationFrameId=NaN,this.initialized=!0,this.isContinuousModeActive&&this.startLoop()}receivedWorkerMessage(t){const e=et(t);if(e.type==="move"){const s=e.message;this.areItemsMoving=this.hasItemMoved(s),!this.areItemsMoving&&this.isLooping&&this.initialized&&this.isContinuousModeActive&&this.stopLoop()}this.updateListeners(e)}updateWorker(t,e){tt(this.worker,{type:t,message:e})}updateListeners({type:t,message:e}){t==="movestart"&&typeof this.onMoveStart=="function"&&this.onMoveStart(e),t==="move"&&typeof this.onMove=="function"&&(this.lastCirclePositions=e,this.onMove(e)),t==="moveend"&&typeof this.onMoveEnd=="function"&&this.onMoveEnd(e)}addCircles(t){if(Array.isArray(t)&&t.length){const e=t.filter(it);e.length&&this.updateWorker("addcircles",e)}this.startLoop()}addCircle(t){this.addCircles([t])}removeCircle(t){t&&(t.id?this.updateWorker("removecircle",t.id):this.updateWorker("removecircle",t),this.startLoop())}pinCircle(t){t&&(t.id?this.updateWorker("pincircle",t.id):this.updateWorker("pincircle",t),this.startLoop())}unpinCircle(t){t&&(t.id?this.updateWorker("unpincircle",t.id):this.updateWorker("unpincircle",t),this.startLoop())}setCircleRadius(t,e){t&&e>=0&&(t.id?this.updateWorker("circleradius",{id:t.id,radius:e}):this.updateWorker("circleradius",{id:t,radius:e}),this.startLoop())}setCircleCenterPull(t,e){t&&(t.id?this.updateWorker("circlecenterpull",{id:t.id,centerPull:!!e}):this.updateWorker("circlecenterpull",{id:t,centerPull:!!e}),this.startLoop())}setCenterPull(t){this.updateWorker("centerpull",{centerPull:!!t}),this.startLoop()}setBounds(t){nt(t)&&(this.updateWorker("bounds",t),this.startLoop())}setTarget(t){this.updateWorker("target",t),this.startLoop()}setCenteringPasses(t){this.updateWorker("centeringpasses",t)}setCollisionPasses(t){this.updateWorker("collisionpasses",t)}setDamping(t){this.updateWorker("damping",t)}update(){this.updateWorker("update")}dragStart(t){this.updateWorker("dragstart",{id:t}),this.startLoop()}drag(t,e){this.updateWorker("drag",{id:t,position:e}),this.startLoop()}dragEnd(t){this.updateWorker("dragend",{id:t}),this.startLoop()}updateLoop(){this.update(),this.isLooping&&(this.areItemsMoving?this.animationFrameId=requestAnimationFrame(this.updateLoop.bind(this)):this.stopLoop())}startLoop(){!this.isLooping&&this.initialized&&this.isContinuousModeActive&&(this.isLooping=!0,this.isContinuousModeActive&&(this.areItemsMoving=!0),this.updateListeners({type:"movestart"}),this.animationFrameId=requestAnimationFrame(this.updateLoop.bind(this)))}stopLoop(){this.isLooping&&(this.isLooping=!1,this.updateListeners({type:"moveend",message:this.lastCirclePositions}),cancelAnimationFrame(this.animationFrameId))}hasItemMoved(t){let e=!1;for(let s in t)(Math.abs(t[s].delta.x)>.005||Math.abs(t[s].delta.y)>.005)&&(e=!0);return e}destroy(){this.worker&&this.worker.terminate(),this.stopLoop(),this.onMove=null,this.onMoveStart=null,this.onMoveEnd=null}}function z(n,t,e){const s=n.slice();return s[8]=t[e],s[10]=e,s}function K(n){let t,e,s,l,r,o=n[8].desc+"",g,d,v,h,a,f,y,P=n[8].url+"",w;return{c(){t=b("br"),e=M(),s=b("br"),l=M(),r=b("small"),g=O(o),d=M(),v=b("br"),h=M(),a=b("br"),f=M(),y=b("a"),w=O(P),this.h()},l(i){t=C(i,"BR",{}),e=x(i),s=C(i,"BR",{}),l=x(i),r=C(i,"SMALL",{class:!0});var c=S(r);g=$(c,o),d=x(c),v=C(c,"BR",{}),h=x(c),a=C(c,"BR",{}),f=x(c),y=C(c,"A",{href:!0,class:!0});var L=S(y);w=$(L,P),L.forEach(p),c.forEach(p),this.h()},h(){u(y,"href",n[8].url),u(y,"class","svelte-1e1opix"),u(r,"class","svelte-1e1opix")},m(i,c){k(i,t,c),k(i,e,c),k(i,s,c),k(i,l,c),k(i,r,c),m(r,g),m(r,d),m(r,v),m(r,h),m(r,a),m(r,f),m(r,y),m(y,w)},p:B,d(i){i&&p(t),i&&p(e),i&&p(s),i&&p(l),i&&p(r)}}}function F(n){let t,e=n[8].name+"",s,l,r,o,g,d=n[3][n[10]]&&K(n);function v(...h){return n[5](n[10],...h)}return{c(){t=b("div"),s=O(e),l=M(),d&&d.c(),r=M(),this.h()},l(h){t=C(h,"DIV",{class:!0});var a=S(t);s=$(a,e),l=x(a),d&&d.l(a),r=x(a),a.forEach(p),this.h()},h(){u(t,"class","item svelte-1e1opix"),V(t,"active",n[3][n[10]])},m(h,a){k(h,t,a),m(t,s),m(t,l),d&&d.m(t,null),m(t,r),o||(g=U(t,"click",v),o=!0)},p(h,a){n=h,n[3][n[10]]?d?d.p(n,a):(d=K(n),d.c(),d.m(t,r)):d&&(d.d(1),d=null),a&8&&V(t,"active",n[3][n[10]])},d(h){h&&p(t),d&&d.d(),o=!1,g()}}}function rt(n){let t,e=n[4],s=[];for(let l=0;l<e.length;l+=1)s[l]=F(z(n,e,l));return{c(){t=b("div");for(let l=0;l<s.length;l+=1)s[l].c();this.h()},l(l){t=C(l,"DIV",{class:!0});var r=S(t);for(let o=0;o<s.length;o+=1)s[o].l(r);r.forEach(p),this.h()},h(){u(t,"class","container svelte-1e1opix")},m(l,r){k(l,t,r);for(let o=0;o<s.length;o+=1)s[o].m(t,null);n[6](t)},p(l,[r]){if(r&30){e=l[4];let o;for(o=0;o<e.length;o+=1){const g=z(l,e,o);s[o]?s[o].p(g,r):(s[o]=F(g),s[o].c(),s[o].m(t,null))}for(;o<s.length;o+=1)s[o].d(1);s.length=e.length}},i:B,o:B,d(l){l&&p(t),Y(s,l),n[6](null)}}}function ot(n,t,e){const s=[{name:"tuibox",img:"https://raw.githubusercontent.com/Cubified/tuibox/main/demos/demo_colorslide.gif",url:"https://github.com/Cubified/tuibox",langs:["C"],desc:"A single-header terminal UI (TUI) library, capable of creating mouse-driven, interactive applications on the command line."},{name:"mode7",img:`${A}/mode7.gif`,url:"https://github.com/Cubified/mode7",langs:["JavaScript"],desc:"A pure-Javascript perspective transform (a la SNES Mode 7)."},{name:"Trulioo.com",img:`${A}/trulioo.png`,url:"https://www.trulioo.com",langs:["JavaScript","PHP"],desc:"Designed and implemented a custom 3D globe component from scratch using WebGL.  Also created all animations on site homepage with CSS and JS."},{name:"ntwm",img:"https://raw.githubusercontent.com/Cubified/ntwm/master/images/modes/grid.png",url:"https://github.com/Cubified/ntwm",langs:["C"],desc:"A tiny, frameless, keyboard-driven tiling window manager with multimonitor support."},{name:"lush",img:"https://github.com/Cubified/lush/raw/main/demo.gif",url:"https://github.com/Cubified/lush",langs:["x86 Assembly","C"],desc:"A tiny UNIX shell. Supports syntax highlighting and command ghosting/onion skin by default, built on top of a custom line editor written in Assembly."},{name:"Make-A-Wish Volunteer Hub",img:`${A}/maw.png`,url:"https://github.com/TritonSE/MAW-Volunteer-Hub",langs:["React.js","MongoDB"],desc:"A volunteer portal for the San Diego chapter of the Make-A-Wish Foundation, built as part of Triton Software Engineering."},{name:"Y-Stem and Chess",img:`${A}/ysc.png`,url:"https://github.com/TritonSE/YSC-Mobile-Application",langs:["TypeScript","React Native"],desc:"A real-time chess mobile application, built as part of Triton Software Engineering."},{name:"bdfedit",img:"https://github.com/Cubified/bdfedit/raw/main/demo.gif",url:"https://github.com/Cubified/bdfedit",langs:["C"],desc:"A terminal-based, mouse-driven BDF (bitmap) font editor."},{name:"term",img:"https://github.com/Cubified/term/raw/main/demo.gif",url:"https://github.com/Cubified/term",langs:["C"],desc:"A tiny VT-100 terminal emulator for Linux, built with Unicode and Truecolor support."},{name:"React Simple Scheduler",img:"https://github.com/cubified/react-simple-scheduler/raw/main/demo/demo.png",url:"https://github.com/Cubified/react-simple-scheduler",langs:["TypeScript","React","SASS"],desc:"Simple, extensible scheduler and calendar components for React, modeled after Google Calendar."},{name:"Softbody",img:"https://github.com/Cubified/softbody/raw/main/demo.png",url:"https://github.com/Cubified/softbody",langs:["JavaScript"],desc:"A simple soft body physics simulation for n-sided polygons."}],l=(a,f)=>Math.random()*(f-a)+a;let r,o,g;X(()=>{let a={width:r.offsetWidth,height:r.offsetHeight};e(2,g=s.map(()=>({id:Math.random().toString(),radius:50,position:{x:l(-10,10)+a.width/2,y:l(-10,10)+a.height/2}})));const f=y=>{requestAnimationFrame(P=>{let w=0;for(let i in y){const c=y[i],L=c.position.x-c.radius,J=c.position.y-c.radius,T=r.children[w++];T.style.width=c.radius*2+"px",T.style.height=c.radius*2+"px",T.style.transform=`translateX(${L}px) translateY(${J}px)`}})};e(1,o=new st({bounds:a,target:{x:a.width/2,y:a.height/2},circles:g,onMove:f,collisionPasses:3,centeringPasses:2})),window.addEventListener("resize",()=>{r&&(a={width:r.offsetWidth,height:r.offsetHeight},o.setBounds(a),o.setTarget({x:a.width/2,y:a.height/2}))})});let d=new Array(s.length).fill(!1);const v=(a,f)=>{d[a]?(f.target.classList.remove("active"),o.setCircleRadius(g[a],50),e(3,d[a]=!1,d)):(f.target.classList.add("active"),o.setCircleRadius(g[a],150),e(3,d[a]=!0,d))};function h(a){G[a?"unshift":"push"](()=>{r=a,e(0,r)})}return[r,o,g,d,s,v,h]}class at extends q{constructor(t){super(),D(this,t,ot,rt,N,{})}}function lt(n){let t,e,s,l,r,o,g,d,v,h,a,f,y,P,w;return h=new Q({}),f=new Z({}),P=new at({}),{c(){t=b("meta"),e=b("link"),s=b("link"),l=b("link"),r=b("link"),o=b("meta"),g=b("meta"),d=b("meta"),v=M(),_(h.$$.fragment),a=M(),_(f.$$.fragment),y=M(),_(P.$$.fragment),this.h()},l(i){const c=H("svelte-1kj5t3e",document.head);t=C(c,"META",{charset:!0}),e=C(c,"LINK",{rel:!0,sizes:!0,href:!0}),s=C(c,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),l=C(c,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),r=C(c,"LINK",{rel:!0,href:!0}),o=C(c,"META",{name:!0,content:!0}),g=C(c,"META",{name:!0,content:!0}),d=C(c,"META",{name:!0,content:!0}),c.forEach(p),v=x(i),W(h.$$.fragment,i),a=x(i),W(f.$$.fragment,i),y=x(i),W(P.$$.fragment,i),this.h()},h(){u(t,"charset","utf-8"),u(e,"rel","apple-touch-icon"),u(e,"sizes","180x180"),u(e,"href",A+"/apple-touch-icon.png"),u(s,"rel","icon"),u(s,"type","image/png"),u(s,"sizes","32x32"),u(s,"href",A+"/favicon-32x32.png"),u(l,"rel","icon"),u(l,"type","image/png"),u(l,"sizes","16x16"),u(l,"href",A+"/favicon-16x16.png"),u(r,"rel","manifest"),u(r,"href",A+"/site.webmanifest"),u(o,"name","viewport"),u(o,"content","width=device-width, initial-scale=1"),u(g,"name","apple-mobile-web-app-capable"),u(g,"content","yes"),u(d,"name","description"),u(d,"content","A personal portfolio site for UC San Diego computer science student Andrew Russell."),document.title="Andrew Russell - Projects"},m(i,c){m(document.head,t),m(document.head,e),m(document.head,s),m(document.head,l),m(document.head,r),m(document.head,o),m(document.head,g),m(document.head,d),k(i,v,c),j(h,i,c),k(i,a,c),j(f,i,c),k(i,y,c),j(P,i,c),w=!0},p:B,i(i){w||(R(h.$$.fragment,i),R(f.$$.fragment,i),R(P.$$.fragment,i),w=!0)},o(i){I(h.$$.fragment,i),I(f.$$.fragment,i),I(P.$$.fragment,i),w=!1},d(i){p(t),p(e),p(s),p(l),p(r),p(o),p(g),p(d),i&&p(v),E(h,i),i&&p(a),E(f,i),i&&p(y),E(P,i)}}}class ht extends q{constructor(t){super(),D(this,t,null,lt,N,{})}}export{ht as default};
