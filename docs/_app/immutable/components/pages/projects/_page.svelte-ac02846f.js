import{L as ft,S as at,i as lt,s as ct,k as C,a as k,l as v,m as N,c as M,h as y,n as p,p as Q,M as Z,K as O,b as V,G as h,f as j,g as dt,d as ut,t as z,N as mt,o as bt,O as $,P as yt,I as tt,q as E,r as I,B as U,Q as ht,R as pt,T as gt,w as et,J as Ct,x as nt,y as it,z as st}from"../../../chunks/index-f2a81916.js";import{c as B}from"../../../chunks/shared-23917130.js";import{B as vt}from"../../../chunks/border-2c69ce87.js";function G(n,{delay:t=0,duration:e=400,easing:i=ft}={}){const d=+getComputedStyle(n).opacity;return{delay:t,duration:e,easing:i,css:a=>`opacity: ${a*d}`}}function wt(n,t){n.postMessage(JSON.stringify(t))}function Pt(n){return n.data?JSON.parse(n.data):{}}function kt(n){return n&&n.id&&n.radius&&n.position&&typeof n.position.x=="number"&&typeof n.position.y=="number"}function Mt(n){return n&&typeof n.width=="number"&&typeof n.height=="number"}class _t{constructor(t={}){this.worker=new Worker(URL.createObjectURL(new Blob([`// most of this code is taken from here:
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
`],{type:"text/javascript"}))),this.worker.addEventListener("message",this.receivedWorkerMessage.bind(this)),this.isContinuousModeActive=typeof t.continuousMode=="boolean"?t.continuousMode:!0,this.onMoveStart=t.onMoveStart||null,this.onMove=t.onMove||null,this.onMoveEnd=t.onMoveEnd||null,this.lastCirclePositions=[],t.centeringPasses&&this.setCenteringPasses(t.centeringPasses),t.collisionPasses&&this.setCollisionPasses(t.collisionPasses),this.addCircles(t.circles||[]),this.setBounds(t.bounds||{width:100,height:100}),this.setTarget(t.target||{x:50,y:50}),this.isLooping=!1,this.areItemsMoving=!0,this.animationFrameId=NaN,this.initialized=!0,this.isContinuousModeActive&&this.startLoop()}receivedWorkerMessage(t){const e=Pt(t);if(e.type==="move"){const i=e.message;this.areItemsMoving=this.hasItemMoved(i),!this.areItemsMoving&&this.isLooping&&this.initialized&&this.isContinuousModeActive&&this.stopLoop()}this.updateListeners(e)}updateWorker(t,e){wt(this.worker,{type:t,message:e})}updateListeners({type:t,message:e}){t==="movestart"&&typeof this.onMoveStart=="function"&&this.onMoveStart(e),t==="move"&&typeof this.onMove=="function"&&(this.lastCirclePositions=e,this.onMove(e)),t==="moveend"&&typeof this.onMoveEnd=="function"&&this.onMoveEnd(e)}addCircles(t){if(Array.isArray(t)&&t.length){const e=t.filter(kt);e.length&&this.updateWorker("addcircles",e)}this.startLoop()}addCircle(t){this.addCircles([t])}removeCircle(t){t&&(t.id?this.updateWorker("removecircle",t.id):this.updateWorker("removecircle",t),this.startLoop())}pinCircle(t){t&&(t.id?this.updateWorker("pincircle",t.id):this.updateWorker("pincircle",t),this.startLoop())}unpinCircle(t){t&&(t.id?this.updateWorker("unpincircle",t.id):this.updateWorker("unpincircle",t),this.startLoop())}setCircleRadius(t,e){t&&e>=0&&(t.id?this.updateWorker("circleradius",{id:t.id,radius:e}):this.updateWorker("circleradius",{id:t,radius:e}),this.startLoop())}setCircleCenterPull(t,e){t&&(t.id?this.updateWorker("circlecenterpull",{id:t.id,centerPull:!!e}):this.updateWorker("circlecenterpull",{id:t,centerPull:!!e}),this.startLoop())}setCenterPull(t){this.updateWorker("centerpull",{centerPull:!!t}),this.startLoop()}setBounds(t){Mt(t)&&(this.updateWorker("bounds",t),this.startLoop())}setTarget(t){this.updateWorker("target",t),this.startLoop()}setCenteringPasses(t){this.updateWorker("centeringpasses",t)}setCollisionPasses(t){this.updateWorker("collisionpasses",t)}setDamping(t){this.updateWorker("damping",t)}update(){this.updateWorker("update")}dragStart(t){this.updateWorker("dragstart",{id:t}),this.startLoop()}drag(t,e){this.updateWorker("drag",{id:t,position:e}),this.startLoop()}dragEnd(t){this.updateWorker("dragend",{id:t}),this.startLoop()}updateLoop(){this.update(),this.isLooping&&(this.areItemsMoving?this.animationFrameId=requestAnimationFrame(this.updateLoop.bind(this)):this.stopLoop())}startLoop(){!this.isLooping&&this.initialized&&this.isContinuousModeActive&&(this.isLooping=!0,this.isContinuousModeActive&&(this.areItemsMoving=!0),this.updateListeners({type:"movestart"}),this.animationFrameId=requestAnimationFrame(this.updateLoop.bind(this)))}stopLoop(){this.isLooping&&(this.isLooping=!1,this.updateListeners({type:"moveend",message:this.lastCirclePositions}),cancelAnimationFrame(this.animationFrameId))}hasItemMoved(t){let e=!1;for(let i in t)(Math.abs(t[i].delta.x)>.005||Math.abs(t[i].delta.y)>.005)&&(e=!0);return e}destroy(){this.worker&&this.worker.terminate(),this.stopLoop(),this.onMove=null,this.onMoveStart=null,this.onMoveEnd=null}}function rt(n,t,e){const i=n.slice();return i[15]=t[e],i[17]=e,i}function xt(n){let t,e=n[15].name+"",i,d,a,l,r,g,s,c=n[15].desc+"",o,f,b,m,w,F,D=n[15].langs.join(", ")+"",u,_,x,T,K,A,S,J=n[15].url+"",R,Y,q,X;return{c(){t=C("span"),i=E(e),d=k(),a=C("br"),l=k(),r=C("br"),g=k(),s=C("small"),o=E(c),f=k(),b=C("br"),m=k(),w=C("br"),F=E(`
            Built with: `),u=E(D),_=k(),x=C("br"),T=k(),K=C("br"),A=k(),S=C("a"),R=E(J),this.h()},l(W){t=v(W,"SPAN",{class:!0});var L=N(t);i=I(L,e),d=M(L),a=v(L,"BR",{}),l=M(L),r=v(L,"BR",{}),g=M(L),s=v(L,"SMALL",{class:!0});var P=N(s);o=I(P,c),f=M(P),b=v(P,"BR",{}),m=M(P),w=v(P,"BR",{}),F=I(P,`
            Built with: `),u=I(P,D),_=M(P),x=v(P,"BR",{}),T=M(P),K=v(P,"BR",{}),A=M(P),S=v(P,"A",{href:!0,class:!0});var H=N(S);R=I(H,J),H.forEach(y),P.forEach(y),L.forEach(y),this.h()},h(){p(S,"href",n[15].url),p(S,"class","svelte-1x5pf2w"),p(s,"class","svelte-1x5pf2w"),p(t,"class","svelte-1x5pf2w")},m(W,L){V(W,t,L),h(t,i),h(t,d),h(t,a),h(t,l),h(t,r),h(t,g),h(t,s),h(s,o),h(s,f),h(s,b),h(s,m),h(s,w),h(s,F),h(s,u),h(s,_),h(s,x),h(s,T),h(s,K),h(s,A),h(s,S),h(S,R),X=!0},p:U,i(W){X||(ht(()=>{q&&q.end(1),Y=pt(t,G,{delay:300,duration:200}),Y.start()}),X=!0)},o(W){Y&&Y.invalidate(),q=gt(t,G,{duration:100}),X=!1},d(W){W&&y(t),W&&q&&q.end()}}}function At(n){let t,e=n[15].name+"",i,d,a,l;return{c(){t=C("span"),i=E(e),this.h()},l(r){t=v(r,"SPAN",{class:!0});var g=N(t);i=I(g,e),g.forEach(y),this.h()},h(){p(t,"class","svelte-1x5pf2w")},m(r,g){V(r,t,g),h(t,i),l=!0},p:U,i(r){l||(ht(()=>{a&&a.end(1),d=pt(t,G,{delay:300,duration:200}),d.start()}),l=!0)},o(r){d&&d.invalidate(),a=gt(t,G,{duration:100}),l=!1},d(r){r&&y(t),r&&a&&a.end()}}}function ot(n){let t,e,i,d,a,l;const r=[At,xt],g=[];function s(o,f){return o[8].ind!==o[17]?0:1}e=s(n),i=g[e]=r[e](n);function c(...o){return n[11](n[17],n[15],...o)}return{c(){t=C("div"),i.c(),this.h()},l(o){t=v(o,"DIV",{class:!0});var f=N(t);i.l(f),f.forEach(y),this.h()},h(){p(t,"class","item svelte-1x5pf2w"),O(t,"active",n[8].ind===n[17]),O(t,"faded",n[9]>-1&&n[17]!==n[9])},m(o,f){V(o,t,f),g[e].m(t,null),d=!0,a||(l=[$(t,"click",c),$(t,"keydown",St)],a=!0)},p(o,f){n=o;let b=e;e=s(n),e===b?g[e].p(n,f):(dt(),z(g[b],1,1,()=>{g[b]=null}),ut(),i=g[e],i?i.p(n,f):(i=g[e]=r[e](n),i.c()),j(i,1),i.m(t,null)),(!d||f&256)&&O(t,"active",n[8].ind===n[17]),(!d||f&512)&&O(t,"faded",n[9]>-1&&n[17]!==n[9])},i(o){d||(j(i),d=!0)},o(o){z(i),d=!1},d(o){o&&y(t),g[e].d(),a=!1,yt(l)}}}function Lt(n){let t,e,i,d,a,l=n[10],r=[];for(let s=0;s<l.length;s+=1)r[s]=ot(rt(n,l,s));const g=s=>z(r[s],1,1,()=>{r[s]=null});return{c(){t=C("div");for(let s=0;s<r.length;s+=1)r[s].c();e=k(),i=C("img"),this.h()},l(s){t=v(s,"DIV",{class:!0});var c=N(t);for(let o=0;o<r.length;o+=1)r[o].l(c);e=M(c),i=v(c,"IMG",{class:!0,style:!0,src:!0,alt:!0}),c.forEach(y),this.h()},h(){p(i,"class","img svelte-1x5pf2w"),Q(i,"opacity",0+n[5]),Z(i.src,d=n[6])||p(i,"src",d),p(i,"alt",n[7]),p(t,"class","container svelte-1x5pf2w"),O(t,"ready",n[4])},m(s,c){V(s,t,c);for(let o=0;o<r.length;o+=1)r[o].m(t,null);h(t,e),h(t,i),n[12](i),n[13](t),a=!0},p(s,[c]){if(c&2023){l=s[10];let o;for(o=0;o<l.length;o+=1){const f=rt(s,l,o);r[o]?(r[o].p(f,c),j(r[o],1)):(r[o]=ot(f),r[o].c(),j(r[o],1),r[o].m(t,e))}for(dt(),o=l.length;o<r.length;o+=1)g(o);ut()}(!a||c&32)&&Q(i,"opacity",0+s[5]),(!a||c&64&&!Z(i.src,d=s[6]))&&p(i,"src",d),(!a||c&128)&&p(i,"alt",s[7]),(!a||c&16)&&O(t,"ready",s[4])},i(s){if(!a){for(let c=0;c<l.length;c+=1)j(r[c]);a=!0}},o(s){r=r.filter(Boolean);for(let c=0;c<r.length;c+=1)z(r[c]);a=!1},d(s){s&&y(t),mt(r,s),n[12](null),n[13](null)}}}const St=n=>{n.key==="Enter"&&n.target.click()};function Bt(n,t,e){const i=[{name:"tuibox",img:"https://raw.githubusercontent.com/Cubified/tuibox/main/demos/demo_colorslide.gif",url:"https://github.com/Cubified/tuibox",langs:["C"],desc:"A single-header terminal UI (TUI) library, capable of creating mouse-driven, interactive applications on the command line."},{name:"mode7",img:`${B}/mode7.gif`,url:"https://github.com/Cubified/mode7",langs:["JavaScript"],desc:"A pure-Javascript perspective transform (a la SNES Mode 7)."},{name:"Trulioo.com",img:`${B}/trulioo.png`,url:"https://www.trulioo.com",langs:["JavaScript","PHP"],desc:"Designed and implemented a custom 3D globe component from scratch using WebGL.  Also created all animations on site homepage with CSS and JS."},{name:"ntwm",img:"https://raw.githubusercontent.com/Cubified/ntwm/master/images/modes/grid.png",url:"https://github.com/Cubified/ntwm",langs:["C"],desc:"A tiny, frameless, keyboard-driven tiling window manager with multimonitor support."},{name:"lush",img:"https://github.com/Cubified/lush/raw/main/demo.gif",url:"https://github.com/Cubified/lush",langs:["x86 Assembly","C"],desc:"A tiny UNIX shell. Supports syntax highlighting and command ghosting/onion skin by default, built on top of a custom line editor written in Assembly."},{name:"Make-A-Wish Volunteer Hub",img:`${B}/maw.png`,url:"https://github.com/TritonSE/MAW-Volunteer-Hub",langs:["React.js","MongoDB"],desc:"A volunteer portal for the San Diego chapter of the Make-A-Wish Foundation, built as part of Triton Software Engineering."},{name:"Y-Stem and Chess",img:`${B}/ysc.png`,url:"https://github.com/TritonSE/YSC-Mobile-Application",langs:["TypeScript","React Native"],desc:"A real-time chess mobile application, built as part of Triton Software Engineering."},{name:"bdfedit",img:"https://github.com/Cubified/bdfedit/raw/main/demo.gif",url:"https://github.com/Cubified/bdfedit",langs:["C"],desc:"A terminal-based, mouse-driven BDF (bitmap) font editor."},{name:"term",img:"https://github.com/Cubified/term/raw/main/demo.gif",url:"https://github.com/Cubified/term",langs:["C"],desc:"A tiny VT-100 terminal emulator for Linux, built with Unicode and Truecolor support."},{name:"React Simple Scheduler",img:"https://github.com/cubified/react-simple-scheduler/raw/main/demo/demo.png",url:"https://github.com/Cubified/react-simple-scheduler",langs:["TypeScript","React","SASS"],desc:"Simple, extensible scheduler and calendar components for React, modeled after Google Calendar."},{name:"Softbody",img:"https://github.com/Cubified/softbody/raw/main/demo.png",url:"https://github.com/Cubified/softbody",langs:["JavaScript"],desc:"A simple soft body physics simulation for n-sided polygons."},{name:"FixNation Landing Page",img:`${B}/fix.png`,url:"https://landing.fixnation.org",langs:["JavaScript","Svelte"],desc:"A landing page for Los Angeles-based spay and neuter clinic FixNation."}],d=(u,_)=>Math.random()*(_-u)+u;let a,l,r,g,s=!1,c=!1,o=null,f="";bt(()=>{let u={width:a.offsetWidth,height:a.offsetHeight};e(2,r=i.map(()=>({id:Math.random().toString(),radius:50,position:{x:d(-10,10)+u.width/2,y:d(-10,10)+u.height/2}})));const _=x=>{requestAnimationFrame(()=>{if(!a)return;let T=0;for(let K in x){const A=x[K],S=A.position.x-A.radius,J=A.position.y-A.radius,R=a.children[T++];R.style.width=A.radius*2+"px",R.style.height=A.radius*2+"px",R.style.transform=`translateX(${S}px) translateY(${J}px)`}})};e(1,l=new _t({bounds:u,target:{x:u.width/2,y:u.height/2},circles:r,onMove:_,collisionPasses:3,centeringPasses:2})),window.addEventListener("resize",()=>{a&&(u={width:a.offsetWidth,height:a.offsetHeight},l.setBounds(u),b.ind===-1?l.setTarget({x:u.width/2,y:u.height/2}):l.setTarget({x:u.width/2,y:0}))}),g.addEventListener("load",()=>{e(5,c=!0)}),e(4,s=!0)});let b={el:null,ind:-1},m=-1;const w=(u,_,x)=>{if(b.ind===u){x.target.classList.remove("active"),l.setCircleRadius(r[u],50),e(8,b={el:null,ind:-1}),e(5,c=!1),setTimeout(()=>{e(6,o=null),e(7,f=""),e(9,m=-1)},250);let T={width:a.offsetWidth,height:a.offsetHeight};l.setTarget({x:T.width/2,y:T.height/2})}else b.ind>-1&&(b.el.classList.remove("active"),l.setCircleRadius(r[b.ind],50)),x.target.classList.add("active"),l.setCircleRadius(r[u],150),l.dragStart(r[u].id),l.drag(r[u].id,{x:a.offsetWidth/2,y:0}),l.dragEnd(r[u].id),e(8,b={el:x.target,ind:u}),e(5,c=!1),setTimeout(()=>{e(6,o=null),e(7,f=""),setTimeout(()=>{e(6,o=_.img),e(7,f=_.name)},250),e(9,m=u)},250),l.setTarget({x:a.offsetWidth/2,y:0})};function F(u){tt[u?"unshift":"push"](()=>{g=u,e(3,g)})}function D(u){tt[u?"unshift":"push"](()=>{a=u,e(0,a)})}return[a,l,r,g,s,c,o,f,b,m,i,w,F,D]}class Tt extends at{constructor(t){super(),lt(this,t,Bt,Lt,ct,{})}}function Wt(n){let t,e,i,d,a,l,r,g,s,c,o,f,b;return c=new vt({}),f=new Tt({}),{c(){t=C("meta"),e=C("link"),i=C("link"),d=C("link"),a=C("link"),l=C("meta"),r=C("meta"),g=C("meta"),s=k(),et(c.$$.fragment),o=k(),et(f.$$.fragment),this.h()},l(m){const w=Ct("svelte-1kj5t3e",document.head);t=v(w,"META",{charset:!0}),e=v(w,"LINK",{rel:!0,sizes:!0,href:!0}),i=v(w,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),d=v(w,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),a=v(w,"LINK",{rel:!0,href:!0}),l=v(w,"META",{name:!0,content:!0}),r=v(w,"META",{name:!0,content:!0}),g=v(w,"META",{name:!0,content:!0}),w.forEach(y),s=M(m),nt(c.$$.fragment,m),o=M(m),nt(f.$$.fragment,m),this.h()},h(){p(t,"charset","utf-8"),p(e,"rel","apple-touch-icon"),p(e,"sizes","180x180"),p(e,"href",B+"/apple-touch-icon.png"),p(i,"rel","icon"),p(i,"type","image/png"),p(i,"sizes","32x32"),p(i,"href",B+"/favicon-32x32.png"),p(d,"rel","icon"),p(d,"type","image/png"),p(d,"sizes","16x16"),p(d,"href",B+"/favicon-16x16.png"),p(a,"rel","manifest"),p(a,"href",B+"/site.webmanifest"),p(l,"name","viewport"),p(l,"content","width=device-width, initial-scale=1"),p(r,"name","apple-mobile-web-app-capable"),p(r,"content","yes"),p(g,"name","description"),p(g,"content","A personal portfolio site for UC San Diego computer science student Andrew Russell."),document.title="Andrew Russell - Projects"},m(m,w){h(document.head,t),h(document.head,e),h(document.head,i),h(document.head,d),h(document.head,a),h(document.head,l),h(document.head,r),h(document.head,g),V(m,s,w),it(c,m,w),V(m,o,w),it(f,m,w),b=!0},p:U,i(m){b||(j(c.$$.fragment,m),j(f.$$.fragment,m),b=!0)},o(m){z(c.$$.fragment,m),z(f.$$.fragment,m),b=!1},d(m){y(t),y(e),y(i),y(d),y(a),y(l),y(r),y(g),m&&y(s),st(c,m),m&&y(o),st(f,m)}}}class It extends at{constructor(t){super(),lt(this,t,null,Wt,ct,{})}}export{It as default};
