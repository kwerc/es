#!/usr/local/bin/es
options = $options dirstack

dirstack = ()

fn dirs {
	echo $dirstack
}

fn pushd dir {
	let(cwd = `{pwd}) {
		dirstack = $cwd $dirstack
		cd $dir
	}
}

fn popd {
	if {! ~ $#dirstack 0} {
		todir = $dirstack(1)
		dirstack = $dirstack(2 ...)
		cd $todir
	}
}

noexport = $noexport dirstack fn-dirs fn-pushd fn-popd

