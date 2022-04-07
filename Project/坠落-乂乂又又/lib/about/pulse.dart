
import 'package:flutter/material.dart';

class Pulse extends StatefulWidget {
  final Widget child;
  const Pulse({Key key, this.child}) : super(key: key);
  @override
  _PulseState createState() => _PulseState();
}

class _PulseState extends State<Pulse> with SingleTickerProviderStateMixin {
  AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      child: widget.child,
      builder: (BuildContext context, Widget child) {
        return Transform.scale(
          scale: 0.6 + 0.4 * (_controller.value % 0.5),
          child: child,
        );
      },
    );
  }
}
